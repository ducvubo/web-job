import { InjectModel } from '@nestjs/mongoose'
import { CONNECTION_SLAVE } from 'src/constant/connection.config'
import { Model } from 'mongoose'
import { Tag_Areas, Tag_AreasDocument } from './tag-areas.model'

export class TagAreaReadRepository {
  constructor(@InjectModel(Tag_Areas.name, CONNECTION_SLAVE) private tagAreaSlaveModel: Model<Tag_AreasDocument>) {}

  async getTagArealByName(tag_areas_name: string) {
    return this.tagAreaSlaveModel.findOne({ tag_areas_name }).exec()
  }

  async getTagArealByNameInfor(tag_areas_name: string) {
    return this.tagAreaSlaveModel.find({
      tag_areas_name: { $regex: tag_areas_name, $options: 'i' }
    })
  }
}
