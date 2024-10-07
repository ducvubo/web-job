import { Module } from '@nestjs/common'
import { TagAreasService } from './tag-areas.service'
import { TagAreasController } from './tag-areas.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Tag_Areas, Tag_AreasSchema } from './model/tag-areas.model'
import { CONNECTION_MASTER, CONNECTION_SLAVE } from 'src/constant/connection.config'
import { TagAreaReadRepository } from './model/tag-areas-read.repo'
import { TagAreaWriteRepository } from './model/tag-areas-write.repo'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tag_Areas.name, schema: Tag_AreasSchema }], CONNECTION_MASTER),
    MongooseModule.forFeature([{ name: Tag_Areas.name, schema: Tag_AreasSchema }], CONNECTION_SLAVE)
  ],
  controllers: [TagAreasController],
  providers: [TagAreasService, TagAreaReadRepository, TagAreaWriteRepository]
})
export class TagAreasModule {}
