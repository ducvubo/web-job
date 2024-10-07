import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '../auth.service' // Import AuthService

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'x-rf-tk') {
  private accessFailed: boolean = false
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-rf-tk'),
      ignoreExpiration: true,
      secretOrKeyProvider: (request, rawJwtToken, done) => {
        if (!this.accessFailed) {
          this.findPublicKeyAccess(request)
            .then((key) => {
              done(null, key)
            })
            .catch((err) => {
              done(err, null)
            })
        } else {
          done(new Error('Access token is invalid'), null)
        }
      }
    })
  }

  async validate(payload: any) {
    return null
  }

  private async findPublicKeyAccess(request): Promise<string> {
    const refreshToken = request.headers['x-rf-tk']
    const result = await this.authService.findRefreshToken(refreshToken) // Lấy public key từ cơ sở dữ liệu
    if (result) {
      return result.public_key_refresh_token
    } else {
      throw new HttpException('Token không hợp lệ1', HttpStatus.UNAUTHORIZED)
    }
  }
}
