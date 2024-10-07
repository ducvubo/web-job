import { Injectable } from '@nestjs/common'
import { ApiKeyReadRepository } from './model/apikeys.read.repo'
import { ApiKeyWriteRepository } from './model/apikeys.write.repo'

@Injectable()
export class ApikeysService {
  constructor(
    private readonly apiKeyReadRepository: ApiKeyReadRepository,
    private readonly apiKeyWriteRepository: ApiKeyWriteRepository
  ) {}
  async create({
    key,
    secret,
    status,
    permissions
  }: {
    key: string
    secret: string
    status: boolean
    permissions: string[]
  }) {
    return await this.apiKeyWriteRepository.createApiKey({
      key,
      secret,
      status,
      permissions
    })
  }

  async findOne({ key, secret }: { key: string; secret: string }) {
    return await this.apiKeyReadRepository.findOne({ key, secret })
  }
}
