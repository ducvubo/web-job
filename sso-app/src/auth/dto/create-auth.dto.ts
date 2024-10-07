import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateAuthDto {}

export class Register {
  @IsEmail({}, { message: 'Email khong dung dinh dang' })
  @IsNotEmpty({ message: 'Email khong duoc de trong' })
  email: string
}
