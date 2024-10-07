import { IsEmail, IsNotEmpty } from 'class-validator'

export class VerifyOtpDto {
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email: string
  @IsNotEmpty({ message: 'Password không được để trống' })
  password: string
  @IsNotEmpty({ message: 'OTP không được để trống' })
  otp: string
}
