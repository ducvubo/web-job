import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateJobDto } from './dto/create-job.dto'
import { ICompany } from 'src/companies/company.interface'
import { JobWriteRepository } from './model/job-write.repo'
import { JobReadRepository } from './model/job-read.repo'
import aqp from 'api-query-params'
import { deleteCacheIO, getCacheIO, setCacheIO, setCacheIOExpiration } from 'src/utils/cache'
import { UpdateJobDto } from './dto/update-job.dto'
import mongoose from 'mongoose'
import { JobQueue } from './jobs.rabitmq'
import { KEY_JOBS, KEY_JOBS_DELETE, KEY_JOBS_NULL } from 'src/constant/key.redis'

@Injectable()
export class JobsService {
  constructor(
    private readonly jobWriteRepository: JobWriteRepository,
    private readonly jobReadRepository: JobReadRepository,
    private readonly jobQueue: JobQueue
  ) {}
  async createJob(createJobDto: CreateJobDto, company: ICompany) {
    const newJob = await this.jobWriteRepository.createJob(createJobDto, company)
    if (!newJob) {
      throw new HttpException('Tạo job không thành công', HttpStatus.BAD_REQUEST)
    } else {
      this.jobQueue.sendToQueueJob({ action: 'createJob', data: newJob })
      await setCacheIO({ key: `${KEY_JOBS}${newJob._id}`, value: newJob })
    }
    return newJob
  }

  async getAllJobWithCompany(currentPage: number, limit: number, qs: string, company: ICompany) {
    if (currentPage <= 0 || limit <= 0) {
      throw new HttpException('Trang hiện tại và số record phải lớn hơn 0', HttpStatus.BAD_REQUEST)
    }

    const { filter, sort, population } = aqp(qs)
    const type = filter.type ? filter.type : 'all'
    delete filter.current
    delete filter.pageSize
    delete filter.type

    const offset = (+currentPage - 1) * +limit
    const defaultLimit = +limit ? +limit : 10

    const totalItems = (await this.jobReadRepository.getJobWithCompanyFilter({ company, type })).length
    const totalPages = Math.ceil(totalItems / defaultLimit)

    const result = await this.jobReadRepository.getJobWithCompany({
      offset,
      defaultLimit,
      sort,
      population,
      company,
      type
    })
    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        totalItems: totalItems
      },
      result
    }
  }

  async getJobWithCompanyBySlug({ slug, company }: { slug: any; company: ICompany }) {
    const jobRedis = await getCacheIO({ key: `${KEY_JOBS}${slug}` })
    if (jobRedis) return jobRedis

    const jobMongo = await this.jobReadRepository.getJobBySlug(slug)
    if (!jobMongo) {
      await setCacheIOExpiration({ key: `${KEY_JOBS_NULL}${slug}`, value: null, expirationInSeconds: 30 })
      throw new HttpException('Công ty không tồn tại', HttpStatus.BAD_REQUEST)
    }
    await setCacheIO({ key: `${KEY_JOBS}${slug}`, value: jobMongo })

    return jobMongo
  }

  async updateJob(slug: string, updateJobDto: UpdateJobDto, company: ICompany) {
    if (!slug) throw new HttpException('Vui lòng truyền lên id', HttpStatus.BAD_REQUEST)

    const jobExist = await this.jobReadRepository.getJobBySlug(slug)
    if (!jobExist) throw new HttpException('Job không tồn tại', HttpStatus.BAD_REQUEST)

    const updated = await this.jobWriteRepository.updateJob(jobExist._id, updateJobDto, company)
    if (!updated) {
      throw new HttpException('Cập nhật job không thành công', HttpStatus.BAD_REQUEST)
    }
    this.jobQueue.sendToQueueJob({ action: 'updateJob', data: updated })
    await setCacheIO({ key: `${KEY_JOBS}${slug}`, value: updated })
    return updated
  }

  async deleteJob({ slug, company }: { slug: string; company: ICompany }) {
    try {
      if (!slug) throw new HttpException('Không tìm thấy id ở url', HttpStatus.BAD_REQUEST)

      const jobExist = await this.jobReadRepository.getJobBySlug(slug)
      if (!jobExist) throw new HttpException('Job không tồn tại', HttpStatus.BAD_REQUEST)

      const deleted = await this.jobWriteRepository.deleteJob({ id: String(jobExist._id), company })
      if (!deleted) throw new HttpException('Xóa công ty không thành công', HttpStatus.BAD_REQUEST)

      this.jobQueue.sendToQueueJob({ action: 'updateJob', data: deleted })
      await deleteCacheIO({ key: `${KEY_JOBS}${slug}` })
      await setCacheIO({ key: `${KEY_JOBS_DELETE}${slug}`, value: deleted })

      return null
    } catch (error) {
      throw new HttpException('Xóa công ty thất bại', HttpStatus.BAD_REQUEST)
    }
  }

  async updatePublishOrDraftStatus(body: { status: boolean; type: string; _id: string }, company: ICompany) {
    const { status, type, _id } = body
    if (!_id) throw new HttpException('Tham số truyền lên không hợp lệ', HttpStatus.BAD_REQUEST)
    if (type !== 'draft' && type !== 'publish')
      throw new HttpException('Tham số truyền lên không hợp lệ', HttpStatus.BAD_REQUEST)

    let updated: any
    if (type === 'publish') {
      updated = await this.jobWriteRepository.updatePublishStatus(_id, status, company)
    }
    if (type === 'draft') {
      updated = await this.jobWriteRepository.updateDraftStatus(_id, status, company)
    }

    if (!updated) throw new HttpException('Cập nhật trạng thái không thành công', HttpStatus.BAD_REQUEST)

    this.jobQueue.sendToQueueJob({ action: 'updateJob', data: updated })
    await setCacheIO({ key: `${KEY_JOBS}${updated.job_slug}`, value: updated })

    return updated
  }

  async getPaginationJobHome(currentPage: number, limit: number, qs: string) {
    if (currentPage <= 0 || limit <= 0) {
      throw new HttpException('Trang hiện tại và số record phải lớn hơn 0', HttpStatus.BAD_REQUEST)
    }

    const { filter, sort, population } = aqp(qs)
    const type = filter.type ? filter.type : 'all'

    const offset = (+currentPage - 1) * +limit
    const defaultLimit = +limit ? +limit : 10

    const totalItems = (await this.jobReadRepository.getJobWithHomeFilter()).length
    const totalPages = Math.ceil(totalItems / defaultLimit)

    const result = await this.jobReadRepository.getJobWithHome({
      offset,
      defaultLimit,
      sort,
      population
    })
    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        totalItems: totalItems
      },
      result
    }
  }
}
