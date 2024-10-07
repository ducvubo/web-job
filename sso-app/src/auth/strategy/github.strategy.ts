import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-github2'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserService } from 'src/user/user.service'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private configService: ConfigService,
    private userService: UserService
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: 'http://localhost:8080/auth/social-github',
      scope: ['user:email']
    })
  }
  async validate(accessToken: string, refreshToken: string, profile: any, done): Promise<any> {
    const { username, emails } = profile
    this.userService.loginWithSocial(username, emails[0].value, 'GITHUB')
    const user = {
      email: emails[0].value,
      username: username
    }
    return done(null, user)
  }
}
