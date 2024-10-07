import { IsEmail, IsNotEmpty } from 'class-validator'

// class Company {
//   @IsNotEmpty()
//   _id: mongoose.Schema.Types.ObjectId

//   @IsNotEmpty()
//   name: string
// }

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name khong duoc de trong' })
  name: string

  @IsEmail({}, { message: 'Email khong dung dinh danh' })
  @IsNotEmpty({ message: 'Email khong duo de trong' })
  email: string

  @IsNotEmpty({ message: 'Age khong duoc de trong' })
  age: number

  @IsNotEmpty({ message: 'Gender khong duoc de trong' })
  gender: string

  @IsNotEmpty({ message: 'Address khong duoc de trong' })
  address: string

  role: string

  isDeleted: boolean
}

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Name khong duoc de trong' })
  name: string

  @IsEmail({}, { message: 'Email khong dung dinh dang' })
  @IsNotEmpty({ message: 'Email khong duo de trong' })
  email: string

  @IsNotEmpty({ message: 'Age khong duoc de trong' })
  age: number

  @IsNotEmpty({ message: 'Gender khong duoc de trong' })
  gender: string

  @IsNotEmpty({ message: 'Address khong duoc de trong' })
  address: string
}
