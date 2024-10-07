import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ResponseMessage, User } from 'src/decorator/customize'
import { AuthGuardWithSSO } from 'src/guard/authSSO.guard'
import { IUser } from './user.interface'
import { Request as RequestExpress } from 'express'

// import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @ResponseMessage('Tạo mới user')
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto)
    return newUser
  }

  @Post('sso')
  @ResponseMessage('Login with sso')
  async loginWithSSO(@Body() token: { access_token: string; refresh_token: string }) {
    return await this.usersService.loginWithSSO(token)
  }

  @Get('/infor-user')
  @ResponseMessage('Get info user')
  @UseGuards(AuthGuardWithSSO)
  async inforUser(@User() user: IUser) {
    return user
  }

  @Post('refresh-token')
  @ResponseMessage('Refresh token')
  async refreshToken(@Request() req: RequestExpress) {
    const refresh_token: string = req.headers['x-rf-tk'] ? (req.headers['x-rf-tk'] as string) : null
    return await this.usersService.refreshToken({ refresh_token })
  }

  @Get('all')
  async getAll() {
    const users = await this.usersService.findAll()
    return users
  }
}
