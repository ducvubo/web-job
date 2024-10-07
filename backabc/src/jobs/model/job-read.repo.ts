import { InjectModel } from '@nestjs/mongoose'
import { CONNECTION_SLAVE } from 'src/constant/connection.config'
import mongoose, { Model } from 'mongoose'
import { Job, JobDocument } from './job.model'
import { HttpException, HttpStatus } from '@nestjs/common'
import { ICompany } from 'src/companies/company.interface'

export class JobReadRepository {
  constructor(@InjectModel(Job.name, CONNECTION_SLAVE) private jobSlaveModel: Model<JobDocument>) {}

  async getJobWithCompanyFilter({ company, type }) {
    if (type === 'delete') {
      return await this.jobSlaveModel.find({ isDeleted: true, job_company_id: company._id }).exec()
    }

    return await this.jobSlaveModel.find({ isDeleted: false, job_company_id: company._id }).exec()
  }

  async getJobWithCompany({ offset, defaultLimit, sort, population, company, type }) {
    if (type === 'delete') {
      return await this.jobSlaveModel
        .find({
          isDeleted: true,
          job_company_id: company._id
        })
        .skip(offset)
        .limit(defaultLimit)
        .sort(sort as any) //ep kieu du lieu
        .populate(population)
        .exec()
    }
    return await this.jobSlaveModel
      .find({
        isDeleted: false,
        job_company_id: company._id
      })
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any) //ep kieu du lieu
      .populate(population)
      .exec()
  }

  async getJobWithCompanyById({ id, company }: { id: string; company: ICompany }) {
    return this.jobSlaveModel
      .findOne({ _id: id, job_company_id: company._id, isDeleted: false })

      .select('-createdAt -createdBy -updatedAt -__v -isDeleted')
      .exec()
  }

  async getJobBySlug(slug: string) {
    return this.jobSlaveModel
      .findOne({ job_slug: slug, isDeleted: false })

      .select('-createdAt -createdBy -updatedAt -__v -isDeleted')
      .exec()
  }

  async getJobWithHomeFilter() {
    return await this.jobSlaveModel.find({ isDeleted: false, job_isPublished: true, job_isDraft: false }).exec()
  }

  async getJobWithHome({ offset, defaultLimit, sort, population }) {
    return await this.jobSlaveModel
      .find({
        isDeleted: false,
        job_isPublished: true,
        job_isDraft: false
      })
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any) //ep kieu du lieu
      .populate(population)
      .exec()
  }
}
