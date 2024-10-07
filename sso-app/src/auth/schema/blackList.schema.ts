import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
// import { Role } from 'src/roles/schemas/role.schema'

export type BlackListTokenDocument = HydratedDocument<BlackListToken>
@Schema({ timestamps: true })
export class BlackListToken {
  @Prop({ required: true })
  user_id: string

  @Prop({ required: true })
  refresh_token_black_list: string

  @Prop({ required: true, default: Date.now(), index: { expires: '15d' } })
  createdAt: Date
}

export const BlackListTokenSchema = SchemaFactory.createForClass(BlackListToken)
