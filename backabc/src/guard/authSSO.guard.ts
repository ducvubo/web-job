import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthGuardWithSSO implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const access_token = request.headers['authorization'] ? request.headers['authorization'].split(' ')[1] : null
    const refresh_token = request.headers['x-rf-tk'] ? request.headers['x-rf-tk'] : null
    if (!refresh_token || !access_token) throw new HttpException('Token không hợp lệ4', HttpStatus.UNAUTHORIZED)
    await fetch(`${this.configService.get<string>('SSO_APP')}/auth/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'x-rf-tk': refresh_token
      }
    })
      .then((r) => r.json())
      .then(async (data) => {
        if (data.statusCode === 401) {
          throw new HttpException('Token is invalid', HttpStatus.UNAUTHORIZED)
        }
        if (data.statusCode === 200) {
          const inforUser = await this.userService.findOneByEmail(data.data.email)
          request.user = inforUser
        }
      })

    return true
  }
}
