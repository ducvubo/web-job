import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { TagAreaReadRepository } from './model/tag-areas-read.repo'
import { TagAreaWriteRepository } from './model/tag-areas-write.repo'

@Injectable()
export class TagAreasService {
  constructor(
    private readonly tagAreaWriteRepository: TagAreaWriteRepository,
    private readonly tagAreaReadRepository: TagAreaReadRepository
  ) {}

  async createTagSkill(tag_areas_name: string) {
    const tagExist = await this.tagAreaReadRepository.getTagArealByName(tag_areas_name)
    if (tagExist) throw new HttpException(`Tag ${tag_areas_name} đã tồn tại`, HttpStatus.CONFLICT)
    return await this.tagAreaWriteRepository.createTagArea(tag_areas_name)
  }

  async getTagSkillByName(tagName) {
    if (!tagName) throw new HttpException('No tag name', 404)
    return await this.tagAreaReadRepository.getTagArealByNameInfor(tagName)
  }
}
