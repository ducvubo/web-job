import { Controller, Post, Get } from '@nestjs/common'
import { ApiKeyService } from './api-key.service'
import { v4 as uuidv4 } from 'uuid'
import { Public } from 'src/decorator/customize'

@Controller('apikey')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post()
  @Public()
  create() {
    return this.apiKeyService.create({
      key: uuidv4(),
      url: 'http://localhost:3000',
      status: true,
      permission: ['0000']
    })
  }

  @Public()
  @Get()
  async findOne() {
    const result = await this.apiKeyService.findOne('http://localhost:3000', '21af1488-99c1-4e8a-8062-7f8b5975d0c5')
    return result
  }
}
