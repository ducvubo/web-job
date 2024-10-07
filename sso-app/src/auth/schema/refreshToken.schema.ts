import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
// import { Role } from 'src/roles/schemas/role.schema'

export type RefreshTokenDocument = HydratedDocument<RefreshToken>
export interface IRefreshToken {
  user_id: string
  refresh_token: string
  public_key_access_token: string
  public_key_refresh_token: string
}
@Schema({ timestamps: true })
export class RefreshToken {
  @Prop({ required: true })
  user_id: string

  @Prop({ required: true })
  refresh_token: string

  @Prop({ required: true })
  public_key_access_token: string

  @Prop({ required: true })
  public_key_refresh_token: string

  @Prop()
  createdAt: Date
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken)
