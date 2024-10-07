import { Module } from '@nestjs/common'
import { TagSkillsService } from './tag-skills.service'
import { TagSkillsController } from './tag-skills.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Tag_Skills, Tag_SkillsSchema } from './model/tag-skills.model'
import { CONNECTION_MASTER, CONNECTION_SLAVE } from 'src/constant/connection.config'
import { TagSkillReadRepository } from './model/tag-skills-read.repo'
import { TagSkillnWriteRepository } from './model/tag-skills-write.repo'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tag_Skills.name, schema: Tag_SkillsSchema }], CONNECTION_MASTER),
    MongooseModule.forFeature([{ name: Tag_Skills.name, schema: Tag_SkillsSchema }], CONNECTION_SLAVE)
  ],
  controllers: [TagSkillsController],
  providers: [TagSkillsService, TagSkillReadRepository, TagSkillnWriteRepository]
})
export class TagSkillsModule {}
