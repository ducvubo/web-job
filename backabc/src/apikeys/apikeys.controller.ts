import { Controller, Post } from '@nestjs/common'
import { ApikeysService } from './apikeys.service'
import { v4 as uuidv4 } from 'uuid'
import { ResponseMessage } from 'src/decorator/customize'

@Controller('apikeys')
export class ApikeysController {
  constructor(private readonly apikeysService: ApikeysService) {}

  @Post()
  @ResponseMessage('Tạo apikey thành công')
  create() {
    return this.apikeysService.create({
      key: uuidv4(),
      secret: uuidv4(),
      status: true,
      permissions: ['0000']
    })
  }
}
