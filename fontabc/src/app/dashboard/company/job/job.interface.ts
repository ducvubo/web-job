export interface IMarkDown {
  text: string
  html: string
}
export interface IJob {
  _id: string
  createdBy: {
    email: string
    _id: {
      $oid: string
    }
  }
  job_slug: string
  isDeleted: boolean
  job_company_id: string
  job_name: string
  job_wage: string
  job_address_summary: string
  job_exp: string
  job_rank: string
  job_quantity: number
  job_working_type: string
  job_gender: string
  job_start_date: Date
  job_end_date: Date
  job_career: string[]
  job_skills: string[]
  job_area: string[]
  job_description: {
    text: string
    html: string
  }
  job_requirements: {
    text: string
    html: string
  }
  job_benefits: {
    text: string
    html: string
  }
  job_additional_requirements: {
    text: string
    html: string
  }
  job_specific_location: string[]
  job_isPublished: boolean
  job_isDraft: boolean
  job_status: string
  job_publish_status: string
  createdAt: Date
  updatedAt: Date
  __v: number
}

export interface ResSuccess {
  statusCode: number
  message: string
  metaData: {
    result: IJob[]
    meta: {
      pageSize: number
      current: number
      pages: number
      totalItems: number
    }
  }
}

export interface ResFaile {
  statusCode: number
  message: string
}
