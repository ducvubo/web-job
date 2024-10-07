import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import * as crypto from 'crypto'
import { UserService } from 'src/user/user.service'
import { IRefreshToken, RefreshToken, RefreshTokenDocument } from './schema/refreshToken.schema'
import { Model } from 'mongoose'
import { ApiKeyService } from 'src/api-key/api-key.service'
import { IUser } from 'src/user/user.interface'
import { Register } from './dto/create-auth.dto'
import { ClientProxy } from '@nestjs/microservices'
import { BlackListToken, BlackListTokenDocument } from './schema/blackList.schema'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private apiKeyService: ApiKeyService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject('SUBSCRIBER_SERVICE') private readonly subscriberService: ClientProxy,
    @InjectModel(RefreshToken.name, 'sso_master') private refreshTokenMasterModel: Model<RefreshTokenDocument>,
    @InjectModel(RefreshToken.name, 'sso_slave') private refreshTokenSlaveModel: Model<RefreshTokenDocument>,
    @InjectModel(BlackListToken.name, 'sso_master') private blackListTokenMasterModel: Model<BlackListTokenDocument>,
    @InjectModel(RefreshToken.name, 'sso_slave') private blackListTokenSlaveModel: Model<BlackListTokenDocument>
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email)
    if (user) {
      const isValidPassword = await this.usersService.isValidPassword(pass, user.password)
      if (isValidPassword) {
        user.password = undefined
        return user
      }
    }
    return null
  }

  createAccessToken = (_id: string) => {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048
    })
    const access_token = this.jwtService.sign(
      { _id },
      {
        privateKey: privateKey,
        algorithm: 'RS256',
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRE')
      }
    )

    return {
      publicKey,
      access_token
    }
  }

  createRefreshToken = (_id: string) => {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048
    })
    const refresh_token = this.jwtService.sign(
      { _id },
      {
        privateKey: privateKey,
        algorithm: 'RS256',
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE')
      }
    )

    return {
      publicKey,
      refresh_token
    }
  }

  async login(user: IUser) {
    const access_token = this.createAccessToken(user._id)
    const refresh_token = this.createRefreshToken(user._id)

    const accessPublicKeyString = access_token.publicKey.export({ type: 'spki', format: 'pem' }).toString()
    const refreshPublicKeyString = refresh_token.publicKey.export({ type: 'spki', format: 'pem' }).toString()

    await this.refreshTokenMasterModel.create({
      user_id: user._id,
      refresh_token: refresh_token.refresh_token,
      public_key_access_token: accessPublicKeyString,
      public_key_refresh_token: refreshPublicKeyString
    })

    return {
      access_token: access_token.access_token,
      refresh_token: refresh_token.refresh_token
    }
  }

  async findRefreshToken(refresh_token: string) {
    const result = await this.refreshTokenSlaveModel.findOne({ refresh_token })
    return result
  }

  async isApiKey(serviceUrl: string, apikey: string) {
    const result = await this.apiKeyService.findOne(serviceUrl, apikey)
    if (result) {
      return true
    }
    return false
  }

  async loginSocial(email: string, account_type: string) {
    const user = await this.usersService.findUserByEmailAndSocial(email, account_type)
    if (!user) throw new HttpException('Thông tin không hợp lệ', HttpStatus.BAD_REQUEST)
    const user_id = user._id.toString()
    const access_token = this.createAccessToken(user_id)
    const refresh_token = this.createRefreshToken(user_id)

    const accessPublicKeyString = access_token.publicKey.export({ type: 'spki', format: 'pem' }).toString()
    const refreshPublicKeyString = refresh_token.publicKey.export({ type: 'spki', format: 'pem' }).toString()

    await this.refreshTokenMasterModel.create({
      user_id: user._id,
      refresh_token: refresh_token.refresh_token,
      public_key_access_token: accessPublicKeyString,
      public_key_refresh_token: refreshPublicKeyString
    })

    return {
      access_token: access_token.access_token,
      refresh_token: refresh_token.refresh_token
    }
  }

  async register(email: Register) {
    const user = await this.usersService.findOneByEmail(email.email)
    if (user) {
      throw new HttpException('Email đã tồn tại', HttpStatus.BAD_REQUEST)
    }
    this.subscriberService.send({ cmd: 'add-subscriber' }, email).toPromise()
    return { message: 'Đăng ký thành công' }
  }

  async resultRegister(userId: string) {
    const access_token = this.createAccessToken(userId)
    const refresh_token = this.createRefreshToken(userId)

    const accessPublicKeyString = access_token.publicKey.export({ type: 'spki', format: 'pem' }).toString()
    const refreshPublicKeyString = refresh_token.publicKey.export({ type: 'spki', format: 'pem' }).toString()

    await this.refreshTokenMasterModel.create({
      user_id: userId,
      refresh_token: refresh_token.refresh_token,
      public_key_access_token: accessPublicKeyString,
      public_key_refresh_token: refreshPublicKeyString
    })

    return {
      access_token: access_token.access_token,
      refresh_token: refresh_token.refresh_token
    }
  }

  async refreshToken({ refresh_token }: { refresh_token: string }) {
    if (refresh_token) {
      const key: IRefreshToken | null = await this.refreshTokenSlaveModel
        .findOne({ refresh_token: refresh_token })
        .lean()
      if (!key) throw new HttpException('Token không hợp 10', HttpStatus.UNAUTHORIZED)
      if (key) {
        try {
          //giai ma token
          const data_refresh_token = this.jwtService.verify(refresh_token, {
            secret: key.public_key_refresh_token
          })

          //check black list
          const isBlackList = await this.blackListTokenSlaveModel
            .findOne({ refresh_token_black_list: refresh_token })
            .lean()
          if (isBlackList) {
            //đăng xuất tất cả các thiết bị khác
            await this.refreshTokenMasterModel.deleteMany({ user_id: data_refresh_token._id })
            throw new HttpException(
              'Token đã lỗi vui lòng đăng nhập lại để tiếp tục sử dụng dịch vụ1',
              HttpStatus.UNAUTHORIZED
            )
          } else {
            //tạo token mới
            const access_token_new = this.createAccessToken(data_refresh_token._id)
            const refresh_token_new = this.createRefreshToken(data_refresh_token._id)
            const accessPublicKeyString = access_token_new.publicKey.export({ type: 'spki', format: 'pem' }).toString()
            const refresh = refresh_token_new.publicKey.export({ type: 'spki', format: 'pem' }).toString()

            Promise.all([
              await this.refreshTokenMasterModel.create({
                user_id: data_refresh_token._id,
                refresh_token: refresh_token_new.refresh_token,
                public_key_access_token: accessPublicKeyString,
                public_key_refresh_token: refresh
              }),
              await this.blackListTokenMasterModel.create({
                user_id: data_refresh_token._id,
                refresh_token_black_list: refresh_token
              }),
              await this.refreshTokenMasterModel.deleteOne({
                refresh_token: refresh_token,
                user_id: data_refresh_token._id
              })
            ])

            return {
              access_token: access_token_new.access_token,
              refresh_token: refresh_token_new.refresh_token
            }
          }
        } catch (error) {
          console.log(error)
          throw new HttpException(
            'Token đã lỗi vui lòng đăng nhập lại để tiếp tục sử dụng dịch vụ 2',
            HttpStatus.UNAUTHORIZED
          )
        }
      }
    } else {
      throw new HttpException('Không tìm thấy token ở header', HttpStatus.UNAUTHORIZED)
    }
  }
}
