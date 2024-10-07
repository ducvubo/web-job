import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schema/user.schema'
import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import mongoose, { Model } from 'mongoose'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name, 'sso_master') private userMasterModel: Model<UserDocument>,
    @InjectModel(User.name, 'sso_slave') private userSlaveModel: Model<UserDocument>
  ) {}
  getHassPassword = (password: string) => {
    const salt = genSaltSync(10)
    const hash = hashSync(password, salt)
    return hash
  }
  async create(createUserDto: CreateUserDto) {
    const { email, name, password, gender, age, address } = createUserDto
    const isExist = await this.userSlaveModel.findOne({ email: createUserDto.email, account_type: 'LOCAL' })
    if (isExist) {
      throw new BadRequestException(
        `Email: ${createUserDto.email} đã tồn tại trên hệ thống. Vui lòng sử dụng mail khác`
      )
    }
    const hashPassword = this.getHassPassword(password)
    const newUser = await this.userMasterModel.create({
      name,
      email,
      password: hashPassword,
      gender,
      age,
      address,
      account_type: 'LOCAL',
      isDeleted: false
    })
    return {
      _id: newUser?._id,
      createdAt: newUser.createdAt
    }
  }

  async findOneByEmail(email: string) {
    return this.userSlaveModel
      .findOne({
        email,
        account_type: 'LOCAL'
      })
      .lean()
    // .populate({ path: 'role', select: { name: 1 } })
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash)
  }

  async findOne(_id: string) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException('Id không đúng định dạng')
    }
    return await this.userSlaveModel
      .findOne({
        _id,
        isDeleted: false
      })
      .select('-password')
    // .populate({ path: 'role', select: { name: 1, _id: 1 } })
  }

  generateRandomPassword(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:",.<>?'
    let password = ''
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return password
  }

  async loginWithSocial(username: string, email: string, account_type: string) {
    const isExist = await this.userSlaveModel.findOne({ email, account_type })
    if (isExist) {
      return null
    }
    const password = this.generateRandomPassword(8)
    const hashPassword = this.getHassPassword(password)
    await this.userMasterModel.create({
      name: username,
      email,
      password: hashPassword,
      gender: 'Không xác định',
      age: 0,
      address: 'Không xác định',
      account_type,
      isDeleted: false
    })
    return null
  }

  async findUserByEmailAndSocial(email: string, account_type: string) {
    return await this.userSlaveModel.findOne({ email, account_type })
  }
}
