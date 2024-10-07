import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { TagAreasService } from './tag-areas.service'
import { ResponseMessage } from 'src/decorator/customize'

@Controller('tag-areas')
export class TagAreasController {
  constructor(private readonly tagAreasService: TagAreasService) {}

  @Post()
  @ResponseMessage('Tạo tag khu vực làm việc thành công')
  async createTagProfession(@Body() body: any) {
    return this.tagAreasService.createTagSkill(body.tag_name)
  }

  @Get()
  @ResponseMessage('Lấy thông tin tag khu vực làm việc theo tên')
  async getTagProfessionByName(@Query('tag_name') tagName: string) {
    return await this.tagAreasService.getTagSkillByName(tagName)
  }
}
