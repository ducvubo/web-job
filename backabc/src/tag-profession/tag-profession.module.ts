import { Module } from '@nestjs/common'
import { TagProfessionService } from './tag-profession.service'
import { TagProfessionController } from './tag-profession.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Tag_Profession, Tag_ProfessionSchema } from './model/tag-profession.model'
import { CONNECTION_MASTER, CONNECTION_SLAVE } from 'src/constant/connection.config'
import { TagProfessionReadRepository } from './model/tag-profession-read.repo'
import { TagProfessionWriteRepository } from './model/tag-profession-write.repo'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tag_Profession.name, schema: Tag_ProfessionSchema }], CONNECTION_MASTER),
    MongooseModule.forFeature([{ name: Tag_Profession.name, schema: Tag_ProfessionSchema }], CONNECTION_SLAVE)
  ],
  controllers: [TagProfessionController],
  providers: [TagProfessionService, TagProfessionReadRepository, TagProfessionWriteRepository]
})
export class TagProfessionModule {}
