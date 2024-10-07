import {
  Controller,
  Request,
  Get,
  Post,
  Render,
  UseGuards,
  HttpException,
  HttpStatus,
  Query,
  Body,
  Res
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guard/local-auth.guard'
import { Public, ResponseMessage, User } from 'src/decorator/customize'
import { IUser } from 'src/user/user.interface'
import { GoogleOAuthGuard } from './guard/google-oauth.guard'
import { Request as RequestExpress, Response } from 'express'
import { GitHubOAuthGuard } from './guard/github-oauth.guard'
import { Register } from './dto/create-auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @Public()
  @ResponseMessage('Đăng nhập')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Public()
  @Get('/login')
  @Render('login')
  async getPageLogin(@Query('serviceUrl') serviceUrl: string, @Query('apikey') apikey: string) {
    if (!serviceUrl || !apikey) {
      throw new HttpException('missing parameter', HttpStatus.BAD_REQUEST)
    }
    const result = await this.authService.isApiKey(serviceUrl, apikey)
    if (!result) {
      throw new HttpException('missing parameter', HttpStatus.BAD_REQUEST)
    }
    return { serviceUrl, apikey }
  }

  @Get('/login-with-google')
  @UseGuards(GoogleOAuthGuard)
  @Public()
  async googleOAuth() {}

  @Get('social-google')
  @UseGuards(GoogleOAuthGuard)
  // @Render('social')
  @Public()
  googleOAuthRedirect(@Request() req, @Res() res: Response) {
    return res.render('social-google', { email: req.user.email })
  }

  @Post('/login-social-google')
  @Public()
  async loginSocialGoogle(@Body() body) {
    return await this.authService.loginSocial(body.email, 'GOOGLE')
  }

  @Get('/login-with-github')
  @UseGuards(GitHubOAuthGuard)
  @Public()
  async githubOAuth() {}

  @Get('social-github')
  @UseGuards(GitHubOAuthGuard)
  // @Render('social')
  @Public()
  githubOAuthRedirect(@Request() req, @Res() res: Response) {
    return res.render('social-github', { email: req.user.email })
  }

  @Post('/login-social-github')
  @Public()
  async loginSocialGitHub(@Body() body) {
    return await this.authService.loginSocial(body.email, 'GITHUB')
  }

  @Public()
  @Get('/register')
  @Render('register')
  getPageRegister() {
    return {}
  }

  @Public()
  @Post('/register')
  @ResponseMessage('Đăng ký tài khoản')
  async register(@Body() body: Register) {
    return await this.authService.register(body)
  }

  @Get('/me')
  @ResponseMessage('Get profile user with sso')
  getMe(@User() user: IUser) {
    return user
  }

  @Post('/refresh-token')
  @ResponseMessage('Refresh token')
  @Public()
  async refreshToken(@Request() req: RequestExpress) {
    const refresh_token: string = req.headers['x-rf-tk'] ? (req.headers['x-rf-tk'] as string) : null

    const result = await this.authService.refreshToken({ refresh_token })
    return result
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id)
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id)
  // }
}
