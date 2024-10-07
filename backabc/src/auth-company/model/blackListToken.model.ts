import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { Company } from 'src/companies/model/company.schema'
import { SampleSchema } from 'src/utils/sample.schema'
// import { Role } from 'src/roles/schemas/role.schema'

export type BlackListTokenDocument = HydratedDocument<BlackListToken>
@Schema({ timestamps: true })
export class BlackListToken extends SampleSchema {
  @Prop({ type: Types.ObjectId, ref: Company.name, required: true })
  blt_company_id: Types.ObjectId

  @Prop({ required: true })
  blt_refresh_token_black_list: string

  @Prop({ required: true, default: Date.now(), index: { expires: '15d' } })
  createdAt: Date
}

export const BlackListTokenSchema = SchemaFactory.createForClass(BlackListToken)
