import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { emailOtp, emailOtpDocument } from './schema/email.schema'
import { InjectModel } from '@nestjs/mongoose'
import { compareSync } from 'bcryptjs'
import { UserService } from 'src/user/user.service'
import { AuthService } from 'src/auth/auth.service'
import { VerifyOtpDto } from './dto/verifyOtp.dto'

@Injectable()
export class EmailOtpService {
  constructor(
    @InjectModel(emailOtp.name, 'sso_master') private emailOtpMasterModel: Model<emailOtpDocument>,
    @InjectModel(emailOtp.name, 'sso_slave') private emailOtpSlaveModel: Model<emailOtpDocument>,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}
  isValidOtp(otp: string, hash: string) {
    return compareSync(otp, hash)
  }
  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { email, otp, password } = verifyOtpDto
    const otpData = await this.emailOtpSlaveModel.find({ email })
    if (!otpData) {
      throw new HttpException('Email chưa được đăng ký', HttpStatus.UNAUTHORIZED)
    }
    const isValidOtp = otpData.some((item) => {
      return this.isValidOtp(otp, item.hashOtp)
    })
    if (!isValidOtp) {
      throw new HttpException('OTP không hợp lệ', HttpStatus.UNAUTHORIZED)
    }
    const newUser = await this.userService.create({
      email,
      name: 'Không xác định',
      password: password,
      address: 'Không xác định',
      age: 0,
      gender: 'Không xác định'
    })

    return await this.authService.resultRegister(newUser._id.toString())
  }
}
