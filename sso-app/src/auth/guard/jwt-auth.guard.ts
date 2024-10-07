import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from 'src/decorator/customize'

@Injectable()
export class JwtAuthGuard extends AuthGuard(['x-rf-tk', 'x-at-tk']) {
  constructor(private reflector: Reflector) {
    super()
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }

  handleRequest(err, user) {
    // const request: Request = context.switchToHttp().getRequest()
    // console.log(request.route.path as string)
    if (err || !user) {
      throw err || new HttpException('Token không hợp lệ3', HttpStatus.UNAUTHORIZED)
    }
    return user
  }
}
