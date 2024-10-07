import { Module } from '@nestjs/common'
import { ApikeysService } from './apikeys.service'
import { ApikeysController } from './apikeys.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { ApiKey, ApiKeySchema } from './model/apikeys.schema'
import { CONNECTION_MASTER, CONNECTION_SLAVE } from 'src/constant/connection.config'
import { ApiKeyReadRepository } from './model/apikeys.read.repo'
import { ApiKeyWriteRepository } from './model/apikeys.write.repo'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ApiKey.name, schema: ApiKeySchema }], CONNECTION_MASTER),
    MongooseModule.forFeature([{ name: ApiKey.name, schema: ApiKeySchema }], CONNECTION_SLAVE)
  ],
  controllers: [ApikeysController],
  providers: [ApikeysService, ApiKeyReadRepository, ApiKeyWriteRepository],
  exports: [ApikeysService]
})
export class ApikeysModule {}
