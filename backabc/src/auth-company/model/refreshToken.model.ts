import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { Company } from 'src/companies/model/company.schema'
import { SampleSchema } from 'src/utils/sample.schema'
// import { Role } from 'src/roles/schemas/role.schema'

export type RefreshTokenDocument = HydratedDocument<RefreshToken>
export interface IRefreshToken {
  rf_company_id: string
  rf_refresh_token: string
  rf_public_key_access_token: string
  rf_public_key_refresh_token: string
}
@Schema({ timestamps: true })
export class RefreshToken extends SampleSchema {
  @Prop({ type: Types.ObjectId, ref: Company.name, required: true })
  rf_company_id: Types.ObjectId

  @Prop({ required: true })
  rf_refresh_token: string

  @Prop({ required: true })
  rf_public_key_access_token: string

  @Prop({ required: true })
  rf_public_key_refresh_token: string
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken)
