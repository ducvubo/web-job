import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { CompaniesService } from 'src/companies/companies.service'
import * as crypto from 'crypto'
import { loginCompanyDto } from './dto/loginCompany.dto'
import { CONNECTION_MASTER, CONNECTION_SLAVE } from 'src/constant/connection.config'
import { InjectModel } from '@nestjs/mongoose'
import { IRefreshToken, RefreshToken, RefreshTokenDocument } from './model/refreshToken.model'
import { Model } from 'mongoose'
import { BlackListToken, BlackListTokenDocument } from './model/blackListToken.model'

@Injectable()
export class AuthCompanyService {
  constructor(
    @Inject(forwardRef(() => CompaniesService))
    private readonly companiesService: CompaniesService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
    @InjectModel(RefreshToken.name, CONNECTION_MASTER) private refreshMasterModel: Model<RefreshTokenDocument>,
    @InjectModel(RefreshToken.name, CONNECTION_SLAVE) private refreshSlaveModel: Model<RefreshTokenDocument>,
    @InjectModel(BlackListToken.name, CONNECTION_MASTER) private blackListMasterModel: Model<BlackListTokenDocument>,
    @InjectModel(BlackListToken.name, CONNECTION_SLAVE) private blackListSlaveModel: Model<BlackListTokenDocument>
  ) {}

  // createAccessToken = (_id: string) => {
  //   const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  //     modulusLength: 2048
  //   })
  //   const access_token = this.jwtService.sign(
  //     { _id },
  //     {
  //       privateKey: privateKey,
  //       algorithm: 'RS256',
  //       expiresIn: this.configService.get<string>('JWT_ACCESS_COMPANY_EXPIRE')
  //     }
  //   )

  //   return {
  //     publicKey,
  //     access_token
  //   }
  // }

  // createRefreshToken = (_id: string) => {
  //   const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  //     modulusLength: 2048
  //   })
  //   const refresh_token = this.jwtService.sign(
  //     { _id },
  //     {
  //       privateKey: privateKey,
  //       algorithm: 'RS256',
  //       expiresIn: this.configService.get<string>('JWT_REFRESH_COMPANY_EXPIRE')
  //     }
  //   )

  //   return {
  //     publicKey,
  //     refresh_token
  //   }
  // }

  signToken = (_id: string, type: string) => {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048
    })
    const token = this.jwtService.sign(
      { _id },
      {
        privateKey: privateKey,
        algorithm: 'RS256',
        expiresIn:
          type === 'refresh_token'
            ? this.configService.get<string>('JWT_REFRESH_COMPANY_EXPIRE')
            : this.configService.get<string>('JWT_ACCESS_COMPANY_EXPIRE')
      }
    )

    return {
      publicKey,
      token
    }
  }

  verifyToken = (token: string, publicKey: string) => {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: publicKey
      })
      return decoded
    } catch (error) {
      throw new HttpException('Token không h��p lệ', HttpStatus.UNAUTHORIZED)
    }
  }

  async loginCompany({ company_email, company_password }: loginCompanyDto) {
    const CompanyExis = await this.companiesService.getCompanyByEmail(company_email)
    if (!CompanyExis) throw new HttpException('Email hoặc mật khẩu không đúng vui lòng thử lại', HttpStatus.CONFLICT)

    const isValidPassword = this.companiesService.isValidPassword(company_password, CompanyExis.company_password)
    if (!isValidPassword)
      throw new HttpException('Email hoặc mật khẩu không đúng vui lòng thử lại', HttpStatus.CONFLICT)

    const token = await Promise.all([
      this.signToken(String(CompanyExis._id), 'access_token'),
      this.signToken(String(CompanyExis._id), 'refresh_token')
    ])

    const accessPublicKeyString = token[0].publicKey.export({ type: 'spki', format: 'pem' }).toString()
    const refreshPublicKeyString = token[1].publicKey.export({ type: 'spki', format: 'pem' }).toString()

    await this.refreshMasterModel.create({
      rf_company_id: CompanyExis._id,
      rf_refresh_token: token[1].token,
      rf_public_key_access_token: accessPublicKeyString,
      rf_public_key_refresh_token: refreshPublicKeyString
    })

    return {
      cp_access_token: token[0].token,
      cp_refresh_token: token[1].token
    }
  }

  async refreshTokenCompany({ refresh_token }: { refresh_token: string }) {
    if (refresh_token) {
      const key: IRefreshToken | null = await this.refreshSlaveModel.findOne({ rf_refresh_token: refresh_token }).lean()
      if (!key) throw new HttpException('Token không hợp lệ10', HttpStatus.UNAUTHORIZED)
      if (key) {
        try {
          const data_refresh_token = this.jwtService.verify(refresh_token, {
            secret: key.rf_public_key_refresh_token
          })
          const isBlackList = await this.blackListSlaveModel
            .findOne({ blt_refresh_token_black_list: refresh_token })
            .lean()
          if (isBlackList) {
            await this.refreshMasterModel.deleteMany({ rf_company_id: data_refresh_token._id })
            throw new HttpException(
              'Token đã lỗi vui lòng đăng nhập lại để tiếp tục sử dụng dịch vụ1',
              HttpStatus.UNAUTHORIZED
            )
          } else {
            const token = await Promise.all([
              this.signToken(String(data_refresh_token._id), 'access_token'),
              this.signToken(String(data_refresh_token._id), 'refresh_token')
            ])

            const accessPublicKeyString = token[0].publicKey.export({ type: 'spki', format: 'pem' }).toString()
            const refreshPublicKeyString = token[1].publicKey.export({ type: 'spki', format: 'pem' }).toString()

            Promise.all([
              await this.refreshMasterModel.create({
                rf_company_id: data_refresh_token._id,
                rf_refresh_token: token[1].token,
                rf_public_key_access_token: accessPublicKeyString,
                rf_public_key_refresh_token: refreshPublicKeyString
              }),
              await this.blackListMasterModel.create({
                blt_company_id: data_refresh_token._id,
                blt_refresh_token_black_list: refresh_token
              }),
              await this.refreshMasterModel.deleteOne({
                rf_refresh_token: refresh_token
                // rf_company_id: data_refresh_token._id
              })
            ])

            return {
              cp_access_token: token[0].token,
              cp_refresh_token: token[1].token
            }
          }
        } catch (error) {
          console.log(error)
          throw new HttpException(
            'Token lỗi vui lòng đăng nhập lại để tiếp tục sử dụng dịch vụ 2',
            HttpStatus.UNAUTHORIZED
          )
        }
      }
    } else {
      throw new HttpException('Không tìm thấy token ở header', HttpStatus.UNAUTHORIZED)
    }
  }

  async findKeyByRefreshToken({ cp_refresh_token }: { cp_refresh_token: string }) {
    const key: IRefreshToken | null = await this.refreshSlaveModel
      .findOne({ rf_refresh_token: cp_refresh_token })
      .lean()
    if (!key) throw new HttpException('Token không tồn tại', HttpStatus.UNAUTHORIZED)
    return {
      key_access_token: key.rf_public_key_access_token,
      key_refresh_token: key.rf_public_key_refresh_token
    }
  }

  async deleteToken({ _id }: { _id: string }) {
    await this.refreshMasterModel.deleteMany({ rf_company_id: _id })
  }
}
