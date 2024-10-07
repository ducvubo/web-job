import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { SampleSchema } from 'src/utils/sample.schema'
// import { Role } from 'src/roles/schemas/role.schema'

export type ApiKeyDocument = HydratedDocument<ApiKey>

@Schema({ timestamps: true })
export class ApiKey extends SampleSchema {
  @Prop({ required: true })
  ak_key: string

  @Prop({ required: true })
  ak_secret: string

  @Prop({ required: true })
  ak_status: boolean

  @Prop({ required: true })
  ak_permissions: string[]
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey)
