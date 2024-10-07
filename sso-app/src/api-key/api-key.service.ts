import { Injectable } from '@nestjs/common'
import { ApiKey, ApiKeyDocument } from './schema/api-key.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectModel(ApiKey.name, 'sso_master') private apiKeyMasterModel: Model<ApiKeyDocument>,
    @InjectModel(ApiKey.name, 'sso_slave') private apiKeySlaveModel: Model<ApiKeyDocument>
  ) {}

  async create({ key, url, status, permission }: { key: string; url: string; status: boolean; permission: string[] }) {
    // console.log(permission)
    return await this.apiKeyMasterModel.create({
      key,
      url,
      status,
      permissions: permission
    })
  }
  async findOne(url: string, key: string) {
    const result = await this.apiKeySlaveModel.findOne({ url, key })
    return result
  }
}
