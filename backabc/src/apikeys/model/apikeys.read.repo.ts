import { InjectModel } from '@nestjs/mongoose'
import { CONNECTION_SLAVE } from 'src/constant/connection.config'
import { Model } from 'mongoose'
import { ApiKey, ApiKeyDocument } from './apikeys.schema'

export class ApiKeyReadRepository {
  constructor(@InjectModel(ApiKey.name, CONNECTION_SLAVE) private apiKeySlaveModel: Model<ApiKeyDocument>) {}

  async findOne({ key, secret }: { key: string; secret: string }) {
    const abc = await this.apiKeySlaveModel.findOne({ ak_secret: secret, ak_key: key })
    return abc
  }
}
