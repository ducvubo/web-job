import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { SampleSchema } from 'src/utils/sample.schema'
// import { Role } from 'src/roles/schemas/role.schema'

export type Tag_SkillsDocument = HydratedDocument<Tag_Skills>

@Schema({ timestamps: true })
export class Tag_Skills extends SampleSchema {
  @Prop({ type: String, required: true })
  tag_skills_name: string

  @Prop({ type: Number, required: true, default: 0 })
  tag_skills_amount: number
}

export const Tag_SkillsSchema = SchemaFactory.createForClass(Tag_Skills)
