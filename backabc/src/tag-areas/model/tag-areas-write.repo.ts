import { InjectModel } from '@nestjs/mongoose'
import { CONNECTION_MASTER } from 'src/constant/connection.config'
import { Model } from 'mongoose'
import { Tag_Areas, Tag_AreasDocument } from './tag-areas.model'

export class TagAreaWriteRepository {
  constructor(@InjectModel(Tag_Areas.name, CONNECTION_MASTER) private tagAreaMaterModel: Model<Tag_AreasDocument>) {}

  async createTagArea(tag_areas_name: string) {
    return await this.tagAreaMaterModel.create({ tag_areas_name })
  }
}
