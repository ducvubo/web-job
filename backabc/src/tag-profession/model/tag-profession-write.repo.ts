import { InjectModel } from '@nestjs/mongoose'
import { CONNECTION_MASTER } from 'src/constant/connection.config'
import { Model } from 'mongoose'
import { Tag_Profession, Tag_ProfessionDocument } from './tag-profession.model'

export class TagProfessionWriteRepository {
  constructor(
    @InjectModel(Tag_Profession.name, CONNECTION_MASTER) private tagProfessionMaterModel: Model<Tag_ProfessionDocument>
  ) {}

  async createTagProfession(tag_profession_name: string) {
    return await this.tagProfessionMaterModel.create({ tag_profession_name })
  }
}
