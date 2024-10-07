import { InjectModel } from '@nestjs/mongoose'
import { CONNECTION_MASTER } from 'src/constant/connection.config'
import { Model } from 'mongoose'
import { Tag_Skills, Tag_SkillsDocument } from './tag-skills.model'

export class TagSkillnWriteRepository {
  constructor(@InjectModel(Tag_Skills.name, CONNECTION_MASTER) private tagSkillMaterModel: Model<Tag_SkillsDocument>) {}

  async createTagSkill(tag_skills_name: string) {
    return await this.tagSkillMaterModel.create({ tag_skills_name })
  }
}
