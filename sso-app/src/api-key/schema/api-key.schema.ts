import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
// import { Role } from 'src/roles/schemas/role.schema'

export type ApiKeyDocument = HydratedDocument<ApiKey>

@Schema({ timestamps: true })
export class ApiKey {
  @Prop()
  key: string

  @Prop()
  url: string

  @Prop({ required: true })
  status: boolean

  @Prop({ required: true })
  permissions: string[]

  @Prop()
  createdAt: Date
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey)
