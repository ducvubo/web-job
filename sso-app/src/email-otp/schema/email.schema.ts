import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
// import { Role } from 'src/roles/schemas/role.schema'

export type emailOtpDocument = HydratedDocument<emailOtp>

@Schema({ timestamps: true })
export class emailOtp {
  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  hashOtp: string

  @Prop({ required: true, default: Date.now(), index: { expires: '1m' } })
  createdAt: Date
}

export const emailOtpSchema = SchemaFactory.createForClass(emailOtp)
