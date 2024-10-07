import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { TagSkillReadRepository } from './model/tag-skills-read.repo'
import { TagSkillnWriteRepository } from './model/tag-skills-write.repo'

@Injectable()
export class TagSkillsService {
  constructor(
    private readonly tagSkillReadRepository: TagSkillReadRepository,
    private readonly tagSkillWriteRepository: TagSkillnWriteRepository
  ) {}

  async createTagSkill(tag_skills_name: string) {
    const tagExist = await this.tagSkillReadRepository.getTagSkillByName(tag_skills_name)
    if (tagExist) throw new HttpException(`Tag ${tag_skills_name} đã tồn tại`, HttpStatus.CONFLICT)
    return await this.tagSkillWriteRepository.createTagSkill(tag_skills_name)
  }

  async getTagSkillByName(tagName) {
    if (!tagName) throw new HttpException('No tag name', 404)
    return await this.tagSkillReadRepository.getTagSkillByNameInfor(tagName)
  }
}
