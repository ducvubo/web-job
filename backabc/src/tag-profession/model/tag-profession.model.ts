import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { SampleSchema } from 'src/utils/sample.schema'
// import { Role } from 'src/roles/schemas/role.schema'

export type Tag_ProfessionDocument = HydratedDocument<Tag_Profession>

@Schema({ timestamps: true })
export class Tag_Profession extends SampleSchema {
  @Prop({ type: String, required: true })
  tag_profession_name: string

  @Prop({ type: Number, required: true, default: 0 })
  tag_profession_amount: number
}

export const Tag_ProfessionSchema = SchemaFactory.createForClass(Tag_Profession)
