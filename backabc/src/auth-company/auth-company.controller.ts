import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common'
import { AuthCompanyService } from './auth-company.service'
import { ResponseMessage } from 'src/decorator/customize'
import { loginCompanyDto } from './dto/loginCompany.dto'
import { Request as RequestExpress } from 'express'
import { AuthGuardCompany } from 'src/guard/authCompany.guard'

@Controller('auth/company')
export class AuthCompanyController {
  constructor(private readonly authCompanyService: AuthCompanyService) {}

  @Post('/login')
  @ResponseMessage('Đăng nhập công ty')
  async login(@Body() body: loginCompanyDto) {
    return await this.authCompanyService.loginCompany(body)
  }

  @Post('/refresh-token')
  @ResponseMessage('Refresh token')
  async refreshToken(@Request() req: RequestExpress) {
    const refresh_token: string = req.headers['x-rf-tk-cp'] ? (req.headers['x-rf-tk-cp'] as string).split(' ')[1] : null
    const result = await this.authCompanyService.refreshTokenCompany({ refresh_token })
    return result
  }

  @Get('get-infor')
  @UseGuards(AuthGuardCompany)
  @ResponseMessage('Thông tin công ty')
  async getInfor(@Request() req) {
    return req.company
  }
}
