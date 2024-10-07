import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator'

export class loginCompanyDto {
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsString({ message: 'Email phải là chuỗi' })
  company_email: string

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    },
    {
      message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt, và dài ít nhất 8 ký tự'
    }
  )
  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  company_password: string
}
