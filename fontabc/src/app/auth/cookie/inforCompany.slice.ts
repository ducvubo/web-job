import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

export interface inforCompanyState {
  _id: string
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
}

const initialState: inforCompanyState = {
  _id: '',
  company_email: '',
  company_phone: '',
  company_name: '',
  company_avatar: {
    image_url_cloud: '',
    image_url_local: '',
    image_url_custom: ''
  },
  company_banner: {
    image_url_cloud: '',
    image_url_local: '',
    image_url_custom: ''
  },
  company_description: {
    text: '',
    html: ''
  },
  company_website: '',
  company_address: [''],
  company_employee_total: '',
  company_business_field: '',
  company_code_fiscal: '',
  company_recruitment_status: '',
  company_role: '',
  company_status: ''
}

const inforCompanySlice = createSlice({
  name: 'inforCompany',
  initialState,
  reducers: {
    startAppCompany: (state, action: PayloadAction<inforCompanyState>) => {
      ;(state._id = action.payload._id),
        (state.company_email = action.payload.company_email),
        (state.company_phone = action.payload.company_phone),
        (state.company_name = action.payload.company_name),
        (state.company_avatar = action.payload.company_avatar),
        (state.company_banner = action.payload.company_banner),
        (state.company_description = action.payload.company_description),
        (state.company_website = action.payload.company_website),
        (state.company_address = action.payload.company_address),
        (state.company_employee_total = action.payload.company_employee_total),
        (state.company_business_field = action.payload.company_business_field),
        (state.company_code_fiscal = action.payload.company_code_fiscal),
        (state.company_recruitment_status = action.payload.company_recruitment_status),
        (state.company_role = action.payload.company_role),
        (state.company_status = action.payload.company_status)
    }
  }
})

const inforCompanyReducer = inforCompanySlice.reducer
export const { startAppCompany } = inforCompanySlice.actions
export default inforCompanyReducer
