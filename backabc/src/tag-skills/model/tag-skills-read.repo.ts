import { InjectModel } from '@nestjs/mongoose'
import { CONNECTION_SLAVE } from 'src/constant/connection.config'
import { Model } from 'mongoose'
import { Tag_Skills, Tag_SkillsDocument } from './tag-skills.model'

export class TagSkillReadRepository {
  constructor(@InjectModel(Tag_Skills.name, CONNECTION_SLAVE) private tagSkillSlaveModel: Model<Tag_SkillsDocument>) {}

  async getTagSkillByName(tag_skills_name: string) {
    return this.tagSkillSlaveModel.findOne({ tag_skills_name }).exec()
  }

  async getTagSkillByNameInfor(tag_skills_name: string) {
    return this.tagSkillSlaveModel.find({
      tag_skills_name: { $regex: tag_skills_name, $options: 'i' }
    })
  }
}
