import { Module } from '@nestjs/common'
import { ApiKeyService } from './api-key.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ApiKey, ApiKeySchema } from './schema/api-key.schema'
import { ApiKeyController } from './api-key.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ApiKey.name, schema: ApiKeySchema }], 'sso_master'),
    MongooseModule.forFeature([{ name: ApiKey.name, schema: ApiKeySchema }], 'sso_slave')
  ],
  controllers: [ApiKeyController],
  providers: [ApiKeyService],
  exports: [ApiKeyService]
})
export class ApiKeyModule {}
