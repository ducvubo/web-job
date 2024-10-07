import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { SampleSchema } from 'src/utils/sample.schema'
// import { Role } from 'src/roles/schemas/role.schema'

export type CompanyDocument = HydratedDocument<Company>

@Schema({ timestamps: true })
export class Company extends SampleSchema {
  @Prop({ type: String, required: true })
  company_email: string

  @Prop({ type: String, required: true })
  company_phone: string

  @Prop({ type: String, required: true })
  company_password: string

  @Prop({ type: String, required: true })
  company_name: string

  @Prop({ type: String })
  company_slug: string

  @Prop({ type: Object, required: true })
  company_avatar: {
    local: string
    cloudinary: string
    custom: string
  }

  @Prop({ type: Object, required: true })
  company_banner: {
    local: string
    cloudinary: string
    custom: string
  }

  @Prop({ type: Object, required: true })
  company_description: {
    text: string
    html: string
  }

  @Prop()
  company_website: string

  @Prop({ type: Array, required: true })
  company_address: {
    company_address_province: {
      id: string
      full_name: string
    }
    company_address_district: {
      id: string
      full_name: string
    }
    company_address_ward: {
      id: string
      full_name: string
    }
    company_address_specific: string
  }[]

  @Prop({ type: String, required: true })
  company_employee_total: string

  @Prop({ type: String, required: true })
  company_business_field: string

  @Prop({ type: String, required: true })
  company_code_fiscal: string

  @Prop({ type: String, required: true, enum: ['Yes', 'No'] })
  company_recruitment_status: string

  @Prop({ type: String })
  company_followers: string[]

  @Prop({ type: String, required: true })
  company_role: string

  //trạng thái tài khoản
  @Prop({ type: String, required: true, enum: ['Inactive', 'Active', 'Warning'], default: 'Inactive' })
  company_status: string

  @Prop({ type: Boolean, required: true, default: true })
  company_active: boolean

  //verify email
  @Prop({ type: String, required: true, default: 'waiting', enum: ['waiting', 'verify'] })
  company_verify: string

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  company_id: mongoose.Schema.Types.ObjectId
}

export const CompanySchema = SchemaFactory.createForClass(Company)
