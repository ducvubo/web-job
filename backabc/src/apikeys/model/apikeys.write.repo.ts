import { InjectModel } from '@nestjs/mongoose'
import { CONNECTION_MASTER } from 'src/constant/connection.config'
import { Model } from 'mongoose'
import { ApiKey, ApiKeyDocument } from './apikeys.schema'

export class ApiKeyWriteRepository {
  constructor(@InjectModel(ApiKey.name, CONNECTION_MASTER) private apiKeyMaterModel: Model<ApiKeyDocument>) {}

  async createApiKey({
    key,
    status,
    permissions,
    secret
  }: {
    key: string
    secret: string
    status: boolean
    permissions: string[]
  }) {
    return await this.apiKeyMaterModel.create({
      ak_key: key,
      ak_secret: secret,
      ak_status: status,
      ak_permissions: permissions
    })
  }
}
