export interface CompanyAvatar {
  image_url_cloud: string
  image_url_local: string
  image_url_custom: string
}

export interface CompanyBanner {
  image_url_cloud: string
  image_url_local: string
  image_url_custom: string
}

export interface CompanyDescription {
  text: string
  html: string
}

export interface ICompanyList {
  _id: string
  company_slug: string
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
  company_recruitment_status?: 'Yes' | 'No'
  company_role: string
  company_status?: 'Inactive' | 'Active' | 'Warning'
  company_active?: boolean
  company_verify?: 'waiting' | 'verify'
}

export interface ResMeata {
  pageSize: number
  current: number
  pages: number
  totalItems: number
}

export interface ResAllCompany {
  data: ICompanyList[]
  meta: ResMeata
}

export interface Res {
  statusCode: number
  message: string
  metaData: {
    result: ICompanyList[]
    meta: ResMeata
  }
}
