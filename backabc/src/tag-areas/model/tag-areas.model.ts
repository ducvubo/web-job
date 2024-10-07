import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { SampleSchema } from 'src/utils/sample.schema'
// import { Role } from 'src/roles/schemas/role.schema'

export type Tag_AreasDocument = HydratedDocument<Tag_Areas>

@Schema({ timestamps: true })
export class Tag_Areas extends SampleSchema {
  @Prop({ type: String, required: true })
  tag_areas_name: string

  @Prop({ type: Number, required: true, default: 0 })
  tag_areas_amount: number
}

export const Tag_AreasSchema = SchemaFactory.createForClass(Tag_Areas)
