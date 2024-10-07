import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { TagProfessionService } from './tag-profession.service'
import { ResponseMessage } from 'src/decorator/customize'

@Controller('tag-professions')
export class TagProfessionController {
  constructor(private readonly tagProfessionService: TagProfessionService) {}

  @Post()
  @ResponseMessage('Tạo tag nghề nghiệp thành công')
  async createTagProfession(@Body() body: any) {
    return this.tagProfessionService.createTagProfession(body.tag_name)
  }

  @Get()
  @ResponseMessage('Lấy thông tin tag nghề nghiệp theo tên')
  async getTagProfessionByName(@Query('tag_name') tagName: string) {
    return await this.tagProfessionService.getTagProfessionByName(tagName)
  }
}
