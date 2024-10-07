import { AuthError } from 'next-auth'

export class CustomAuthError extends AuthError {
  static type: string

  constructor(message?: any) {
    super()
    this.type = message
  }
}

export class InvalidEmailPasswordError extends AuthError {
  static type: string = 'Email/Password không hợp lệ'
}

export class SignTokenExist extends AuthError {
  static type: string = 'Đã có lỗi xảy ra vui lòng thử lạiq'
}

export class InternalServer extends AuthError {
  static type: string = 'Lỗi không xác định, vui lòng thử lại sau ít phút'
}
