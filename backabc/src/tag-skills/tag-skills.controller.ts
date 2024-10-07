import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { TagSkillsService } from './tag-skills.service'
import { ResponseMessage } from 'src/decorator/customize'

@Controller('tag-skills')
export class TagSkillsController {
  constructor(private readonly tagSkillsService: TagSkillsService) {}

  @Post()
  @ResponseMessage('Tạo tag kỹ năng thành công')
  async createTagProfession(@Body() body: any) {
    return this.tagSkillsService.createTagSkill(body.tag_name)
  }

  @Get()
  @ResponseMessage('Lấy thông tin tag kỹ năng theo tên')
  async getTagProfessionByName(@Query('tag_name') tagName: string) {
    return await this.tagSkillsService.getTagSkillByName(tagName)
  }
}
