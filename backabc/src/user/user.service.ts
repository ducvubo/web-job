import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectModel } from '@nestjs/mongoose'
// import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { User, UserDocument } from './model/user.schema'
// import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import mongoose, { Model } from 'mongoose'
import { ConfigService } from '@nestjs/config'
import { CommandBus } from '@nestjs/cqrs'
import { CONNECTION_MASTER, CONNECTION_SLAVE } from 'src/constant/connection.config'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name, CONNECTION_MASTER) private userMasterModel: Model<UserDocument>,
    @InjectModel(User.name, CONNECTION_SLAVE) private userSlaveModel: Model<UserDocument>,
    private configService: ConfigService,
    private readonly commandBus: CommandBus
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, name, gender, age, address } = createUserDto
    const isExist = await this.userSlaveModel.findOne({ email: createUserDto.email })
    if (isExist) {
      throw new BadRequestException(
        `Email: ${createUserDto.email} đã tồn tại trên hệ thống. Vui lòng sử dụng mail khác`
      )
    }
    const newUser = await this.userSlaveModel.create({
      name,
      email,
      gender,
      age,
      address
    })
    return {
      _id: newUser?._id,
      createdAt: newUser.createdAt
    }
  }

  async findOneByEmail(email: string) {
    return await this.userSlaveModel
      .findOne({ email, isDeleted: false })
      .lean()
      .select('email name address age gender -_id')
  }

  async findOne(_id: string) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException('Id không đúng định dạng')
    }
    return await this.userSlaveModel.findOne({
      _id
    })
  }

  async loginWithSSO(token: { access_token: string; refresh_token: string }) {
    const res = await fetch(`${this.configService.get<string>('SSO_APP')}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        'x-rf-tk': token.refresh_token
      }
    })
    const data = await res.json()
    if (data.statusCode === 401) throw new UnauthorizedException('Token không hợp lệ3')

    const isEmailExist = await this.userSlaveModel.findOne({ email: data.data.email, isDeleted: false }).lean()

    if (!isEmailExist) {
      this.userMasterModel.create({
        email: data.data.email,
        name: data.data.name,
        role: 'user',
        gender: data.data.gender,
        age: data.data.age,
        address: data.data.address,
        isDeleted: false
      })
    }
    return {
      access_token: token.access_token,
      refresh_token: token.refresh_token
    }
  }

  async refreshToken({ refresh_token }: { refresh_token: string }) {
    if (!refresh_token) throw new HttpException('Vui lòng đăng nhập', HttpStatus.UNAUTHORIZED)
    try {
      const res = await fetch(`${this.configService.get<string>('SSO_APP')}/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'x-rf-tk': refresh_token
        }
      })
      const data = await res.json()
      if (data.statusCode === 401) {
        throw new HttpException(data.message, HttpStatus.UNAUTHORIZED)
      } else {
        return data.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  async findAll() {
    return await this.userSlaveModel.find()
  }
}
