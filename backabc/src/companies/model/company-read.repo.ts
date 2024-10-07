import { InjectModel } from '@nestjs/mongoose'
import { Company, CompanyDocument } from './company.schema'
import { CONNECTION_SLAVE } from 'src/constant/connection.config'
import mongoose, { Model } from 'mongoose'
import { HttpException, HttpStatus } from '@nestjs/common'

export class CompanyReadRepository {
  constructor(@InjectModel(Company.name, CONNECTION_SLAVE) private companySlaveModel: Model<CompanyDocument>) {}

  async getCompanyByEmail({ company_email }: { company_email: string }) {
    return this.companySlaveModel.findOne({ company_email: company_email, isDeleted: false }).exec()
  }

  async getCompanyFilter({ filter }) {
    if (filter._id && !mongoose.Types.ObjectId.isValid(filter._id)) {
      throw new HttpException('Id không đúng định dạng', HttpStatus.BAD_REQUEST)
    }
    return this.companySlaveModel
      .find({ ...filter, isDeleted: false })
      .select('-company_password')
      .exec()
  }

  async getAllCompany({ filter, offset, defaultLimit, sort, population }) {
    if (filter._id && !mongoose.Types.ObjectId.isValid(filter._id)) {
      throw new HttpException('Id không đúng định dạng', HttpStatus.BAD_REQUEST)
    }
    return this.companySlaveModel
      .find({
        isDeleted: false,
        ...filter
      })
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any) //ep kieu du lieu
      .populate(population)
      .exec()
  }

  async getCompanyBySlug({ slug }: { slug: string }) {
    return this.companySlaveModel
      .findOne({ company_slug: slug, isDeleted: false, company_verify: 'verify', company_active: true })
      .select(
        '-company_password -createdAt -createdBy -updatedAt -__v -isDeleted -deletedBy -company_active -company_verify '
      )
      .exec()
  }

  async getCompanyByIdAuth({ _id }: { _id: string }) {
    return this.companySlaveModel
      .findOne({ _id, isDeleted: false, company_verify: 'verify', company_active: true })
      .select(
        '-company_password -createdAt -createdBy -updatedAt -__v -isDeleted -deletedBy -company_active -company_verify -company_banner -company_avatar'
      )
      .exec()
  }

  async getAllCompanyNoPagination() {
    return await this.companySlaveModel
      .find({
        isDeleted: false
        // company_verify: 'verify',
        // company_active: true,
        // company_status: 'Active'
      })
      .select('company_avatar company_banner company_name company_description company_slug')
  }

  // async getCompanyBySlug({ company_slug }: { company_slug: string }) {
  //   return await this.companySlaveModel
  //     .findOne({
  //       company_slug
  //       // isDeleted: false,
  //       // company_verify: 'verify',
  //       // company_active: true
  //     })
  //     .select('-company_password -createdAt -createdBy -updatedAt -__v -isDeleted -deletedBy')
  //     .exec()
  // }
}
