import { CreateCompanyDto } from './create_company.dto'
import { OmitType } from '@nestjs/mapped-types'

export class UpdateCompanyDto extends OmitType(CreateCompanyDto, ['company_password', 'company_email'] as const) {}
