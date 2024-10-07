import { InjectModel } from '@nestjs/mongoose'
import { CONNECTION_SLAVE } from 'src/constant/connection.config'
import { Model } from 'mongoose'
import { Tag_Profession, Tag_ProfessionDocument } from './tag-profession.model'

export class TagProfessionReadRepository {
  constructor(
    @InjectModel(Tag_Profession.name, CONNECTION_SLAVE) private tagProfessionSlaveModel: Model<Tag_ProfessionDocument>
  ) {}

  async getTagProfessionByName(tag_profession_name: string) {
    return this.tagProfessionSlaveModel.findOne({ tag_profession_name }).exec()
  }

  async getTagProfessionByNameInfor(tag_profession_name: string) {
    return this.tagProfessionSlaveModel.find({
      tag_profession_name: { $regex: tag_profession_name, $options: 'i' }
    })
  }
}
