interface CompanyAvatar {
  image_url_cloud: string
  image_url_local: string
  image_url_custom: string
}

interface CompanyBanner {
  image_url_cloud: string
  image_url_local: string
  image_url_custom: string
}

interface CompanyDescription {
  text: string
  html: string
}

interface CreatedBy {
  email: string
}

export interface ICompany {
  _id: string
  createdBy: CreatedBy
  isDeleted: boolean
  company_email: string
  company_phone: string
  company_name: string
  company_avatar: CompanyAvatar
  company_banner: CompanyBanner
  company_description: CompanyDescription
  company_website: string
  company_address: string[]
  company_employee_total: string
  company_business_field: string
  company_code_fiscal: string
  company_recruitment_status: string
  company_role: string
  company_status: string
  company_active: boolean
  company_verify: string
  createdAt: Date
  updatedAt: Date
  __v: number
}
