import { InjectModel } from '@nestjs/mongoose'
import { Company, CompanyDocument } from './company.schema'
import { CONNECTION_MASTER } from 'src/constant/connection.config'
import { Model } from 'mongoose'
import { CreateCompanyDto } from '../dto/create_company.dto'
import { IUser } from 'src/user/user.interface'
import { UpdateCompanyDto } from '../dto/update_company.dto'
import { generateSlug } from 'src/utils'

export class CompanyWriteRepository {
  constructor(@InjectModel(Company.name, CONNECTION_MASTER) private companyMaterModel: Model<CompanyDocument>) {}

  async createCompany(createCompanyDto: CreateCompanyDto, user: IUser) {
    const {
      company_email,
      company_phone,
      company_password,
      company_name,
      company_avatar,
      company_banner,
      company_description,
      company_website,
      company_address,
      company_employee_total,
      company_business_field,
      company_code_fiscal,
      company_recruitment_status
    } = createCompanyDto

    const slug = generateSlug(company_name)

    return await this.companyMaterModel.create({
      company_email,
      company_phone,
      company_password,
      company_name,
      company_slug: slug,
      company_avatar,
      company_banner,
      company_description,
      company_website,
      company_address,
      company_employee_total,
      company_code_fiscal,
      company_business_field,
      company_role: 'Company',
      company_verify: 'verify',
      company_recruitment_status,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    })
  }
  async updateCompany(_id: string, updateCompany: UpdateCompanyDto, user: IUser) {
    const {
      company_address,
      company_avatar,
      company_banner,
      company_business_field,
      company_code_fiscal,
      company_description,
      company_employee_total,
      company_name,
      company_phone,
      company_recruitment_status,
      company_website
    } = updateCompany

    return await this.companyMaterModel
      .findByIdAndUpdate(
        _id,
        {
          company_address,
          company_avatar,
          company_banner,
          company_business_field,
          company_code_fiscal,
          company_description,
          company_employee_total,
          company_name,
          company_phone,
          company_recruitment_status,
          company_website,
          updatedBy: {
            _id: user._id,
            email: user.email
          }
        },
        { new: true }
      )
      .select('-company_password -createdAt -createdBy -updatedAt -__v -isDeleted')
  }

  async deleteCompany({ id, user }: { id: string; user: IUser }) {
    return await this.companyMaterModel.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      },
      { new: true }
    )
  }
}
