import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { SampleSchema } from 'src/utils/sample.schema'
// import { Role } from 'src/roles/schemas/role.schema'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User extends SampleSchema {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop()
  age: number

  @Prop()
  gender: string

  @Prop()
  address: string

  @Prop()
  account_type: string

  @Prop()
  token_update: string
}

export const UserSchema = SchemaFactory.createForClass(User)
