import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { TagProfessionWriteRepository } from './model/tag-profession-write.repo'
import { TagProfessionReadRepository } from './model/tag-profession-read.repo'

@Injectable()
export class TagProfessionService {
  constructor(
    private readonly tagProfessionWriteRepository: TagProfessionWriteRepository,
    private readonly tagProfessionReadRepository: TagProfessionReadRepository
  ) {}

  async createTagProfession(tag_profession_name: string) {
    const tagExist = await this.tagProfessionReadRepository.getTagProfessionByName(tag_profession_name)
    if (tagExist) throw new HttpException(`Tag ${tag_profession_name} đã tồn tại`, HttpStatus.CONFLICT)
    return await this.tagProfessionWriteRepository.createTagProfession(tag_profession_name)
  }

  async getTagProfessionByName(tagName) {
    if (!tagName) throw new HttpException('No tag name', 404)
    return await this.tagProfessionReadRepository.getTagProfessionByNameInfor(tagName)
  }
}
