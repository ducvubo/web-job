import { InjectModel } from '@nestjs/mongoose'
import { CONNECTION_MASTER } from 'src/constant/connection.config'
import { Model } from 'mongoose'
import { Job, JobDocument } from './job.model'
import { CreateJobDto } from '../dto/create-job.dto'
import { ICompany } from 'src/companies/company.interface'
import { generateSlug } from 'src/utils'

export class JobWriteRepository {
  constructor(@InjectModel(Job.name, CONNECTION_MASTER) private jobMaterModel: Model<JobDocument>) {}

  async createJob(createJobDto: CreateJobDto, company: ICompany) {
    const {
      job_additional_requirements,
      job_benefits,
      job_name,
      job_wage,
      job_address_summary,
      job_exp,
      job_rank,
      job_quantity,
      job_working_type,
      job_gender,
      job_start_date,
      job_end_date,
      job_career,
      job_skills,
      job_area,
      job_description,
      job_requirements,
      job_specific_location,
      job_isPublished,
      job_isDraft
    } = createJobDto

    const slug = generateSlug(job_name)

    const { company_email, _id } = company
    const newJob = await this.jobMaterModel.create({
      job_company_id: _id,
      job_name,
      job_wage,
      job_address_summary,
      job_slug: slug,
      job_exp,
      job_rank,
      job_quantity,
      job_working_type,
      job_gender,
      job_additional_requirements,
      job_benefits,
      job_start_date,
      job_end_date,
      job_career,
      job_skills,
      job_area,
      job_description,
      job_requirements,
      job_specific_location,
      job_isPublished,
      job_isDraft,
      createdBy: {
        email: company_email,
        _id: _id
      }
    })
    return newJob
  }

  updateJob(id, updateJobDto, company) {
    const {
      job_additional_requirements,
      job_benefits,
      job_name,
      job_wage,
      job_address_summary,
      job_exp,
      job_rank,
      job_quantity,
      job_working_type,
      job_gender,
      job_start_date,
      job_end_date,
      job_career,
      job_skills,
      job_area,
      job_description,
      job_requirements,
      job_specific_location,
      job_isPublished,
      job_isDraft
    } = updateJobDto

    const { company_email, _id } = company
    return this.jobMaterModel
      .findByIdAndUpdate(
        id,
        {
          job_name,
          job_wage,
          job_address_summary,
          job_exp,
          job_rank,
          job_quantity,
          job_working_type,
          job_gender,
          job_additional_requirements,
          job_benefits,
          job_start_date,
          job_end_date,
          job_career,
          job_skills,
          job_area,
          job_description,
          job_requirements,
          job_specific_location,
          job_isPublished,
          job_isDraft,
          updatedBy: {
            email: company_email,
            _id: _id
          }
        },
        { new: true }
      )
      .select('-createdAt -createdBy -updatedAt -__v -isDeleted')
  }

  async deleteJob({ id, company }: { id: string; company: ICompany }) {
    return await this.jobMaterModel.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        deletedBy: {
          _id: company._id,
          email: company.company_email
        }
      },
      { new: true }
    )
  }

  async updatePublishStatus(_id, status, company) {
    return await this.jobMaterModel.findByIdAndUpdate(
      _id,
      {
        job_isPublished: status,
        updatedBy: {
          _id: company._id,
          email: company.company_email
        }
      },
      { new: true }
    )
  }

  async updateDraftStatus(_id, status, company) {
    return await this.jobMaterModel.findByIdAndUpdate(
      _id,
      {
        job_isDraft: status,
        updatedBy: {
          _id: company._id,
          email: company.company_email
        }
      },
      { new: true }
    )
  }
}
