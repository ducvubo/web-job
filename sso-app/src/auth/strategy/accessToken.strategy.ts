import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { UserService } from 'src/user/user.service'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'x-at-tk') {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKeyProvider: (request, rawJwtToken, done) => {
        this.findPublicKeyAccess(request)
          .then((key) => {
            done(null, key)
          })
          .catch((err) => {
            done(err, null)
          })
      }
    })
  }

  async validate(payload: any) {
    const result = await this.userService.findOne(payload._id)
    return {
      _id: result._id,
      email: result.email,
      name: result.name,
      age: result.age,
      gender: result.gender,
      address: result.address
    }
  }

  private async findPublicKeyAccess(request): Promise<string> {
    const refreshToken = request.headers['x-rf-tk']
    const result = await this.authService.findRefreshToken(refreshToken) // Lấy public key từ cơ sở dữ liệu
    if (result) {
      return result.public_key_access_token
    } else {
      throw new HttpException('Token không hợp lệ2', HttpStatus.UNAUTHORIZED)
    }
  }
}
