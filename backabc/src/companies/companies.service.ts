import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CreateCompanyDto } from './dto/create_company.dto'
import { IUser } from 'src/user/user.interface'
import { CompanyReadRepository } from './model/company-read.repo'
import { CompanyWriteRepository } from './model/company-write.repo'
import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import aqp from 'api-query-params'
import mongoose from 'mongoose'
import { deleteCacheIO, getCacheIO, setCacheIO, setCacheIOExpiration } from 'src/utils/cache'
import { KEY_COMPANIES, KEY_COMPANIES_DELETE, KEY_COMPANIES_NULL } from 'src/constant/key.redis'
import { UpdateCompanyDto } from './dto/update_company.dto'
import { AuthCompanyService } from 'src/auth-company/auth-company.service'
import { CompanyQueue } from './companies.rabbitmq'

@Injectable()
export class CompaniesService {
  constructor(
    private configService: ConfigService,
    private readonly companyReadRepository: CompanyReadRepository,
    private readonly companyWriteRepository: CompanyWriteRepository,
    @Inject(forwardRef(() => AuthCompanyService))
    private readonly authCompanyService: AuthCompanyService,
    private readonly companyQueue: CompanyQueue
  ) {}

  getHassPassword = (password: string) => {
    const salt = genSaltSync(10)
    const hash = hashSync(password, salt)
    return hash
  }
  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash)
  }

  async createCompany(createCompanyDto: CreateCompanyDto, user: IUser) {
    const { company_email, company_password } = createCompanyDto

    const companyExist = await this.companyReadRepository.getCompanyByEmail({ company_email })
    if (companyExist) throw new HttpException('Đã có công ty được đăng ký với email này', HttpStatus.CONFLICT)

    const hashPassword = this.getHassPassword(company_password)
    const newCompany = await this.companyWriteRepository.createCompany(
      { ...createCompanyDto, company_password: hashPassword },
      user
    )
    if (!newCompany) {
      throw new HttpException('Tạo job không thành công', HttpStatus.BAD_REQUEST)
    } else {
      this.companyQueue.sendToQueueCompany({ action: 'createCompany', data: newCompany })
      await setCacheIO({ key: `${KEY_COMPANIES}${newCompany._id}`, value: newCompany })
    }

    return {
      _id: newCompany._id,
      createdAt: newCompany.createdAt
    }
  }

  async getAllCompanies(currentPage: number, limit: number, qs: string) {
    if (currentPage <= 0 || limit <= 0) {
      throw new HttpException('Trang hiện tại và số record phải lớn hơn 0', HttpStatus.BAD_REQUEST)
    }

    const { filter, sort, population } = aqp(qs)

    delete filter.current
    delete filter.pageSize

    const offset = (+currentPage - 1) * +limit
    const defaultLimit = +limit ? +limit : 10

    const totalItems = (await this.companyReadRepository.getCompanyFilter({ filter })).length
    const totalPages = Math.ceil(totalItems / defaultLimit)

    const result = await this.companyReadRepository.getAllCompany({ filter, offset, defaultLimit, sort, population })

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

  async getCompanyByIdAuth({ id }: { id: any }) {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new HttpException('Id không hợp lệ', HttpStatus.BAD_REQUEST)

    const companyMongo = await this.companyReadRepository.getCompanyByIdAuth({ _id: id })

    return companyMongo
  }

  async getCompanyBySlug({ slug }: { slug: any }) {
    const companyRedis = await getCacheIO({ key: `${KEY_COMPANIES}${slug}` })
    if (companyRedis) return companyRedis

    const companyMongo = await this.companyReadRepository.getCompanyBySlug({ slug: slug })
    if (!companyMongo) {
      await setCacheIOExpiration({ key: `${KEY_COMPANIES_NULL}${slug}`, value: null, expirationInSeconds: 30 })
      throw new HttpException('Công ty không tồn tại', HttpStatus.BAD_REQUEST)
    }
    await setCacheIO({ key: `${KEY_COMPANIES}${slug}`, value: companyMongo })

    return companyMongo
  }

  async updateCompany(slug: string, updateCompany: UpdateCompanyDto, user: IUser) {
    if (!slug) throw new HttpException('Vui lòng truyền slug lên', HttpStatus.BAD_REQUEST)

    const companyExist = await this.companyReadRepository.getCompanyBySlug({ slug: slug })
    if (!companyExist) throw new HttpException('Công ty không tồn tại', HttpStatus.BAD_REQUEST)

    const updated = await this.companyWriteRepository.updateCompany(String(companyExist._id), updateCompany, user)
    if (!updated) {
      throw new HttpException('Cập nhật công ty không thành công', HttpStatus.BAD_REQUEST)
    }
    this.companyQueue.sendToQueueCompany({ action: 'updateCompany', data: updated })
    await setCacheIO({ key: `${KEY_COMPANIES}${slug}`, value: updated })
    return updated
  }

  async deleteCompany({ slug, user }: { slug: string; user: IUser }) {
    try {
      if (!slug) throw new HttpException('Không tìm thấy slug ở url', HttpStatus.BAD_REQUEST)

      const companyExist = await this.companyReadRepository.getCompanyBySlug({ slug: slug })
      if (!companyExist) throw new HttpException('Công ty không tồn tại', HttpStatus.BAD_REQUEST)

      const deleted = await this.companyWriteRepository.deleteCompany({ id: String(companyExist._id), user })
      if (!deleted) throw new HttpException('Xóa công ty không thành công', HttpStatus.BAD_REQUEST)
      this.companyQueue.sendToQueueCompany({ action: 'updateCompany', data: deleted })
      await deleteCacheIO({ key: `${KEY_COMPANIES}${slug}` })
      await setCacheIO({ key: `${KEY_COMPANIES_DELETE}${slug}`, value: deleted })
      return null
    } catch (error) {
      throw new HttpException('Xóa công ty thất bại', HttpStatus.BAD_REQUEST)
    }
  }

  async getCompanyByEmail(email: string) {
    return await this.companyReadRepository.getCompanyByEmail({ company_email: email })
  }

  async getAllCompnay() {
    return await this.companyReadRepository.getAllCompanyNoPagination()
  }

  // async getCompanyBySlug({ company_slug }: { company_slug: string }) {
  //   return await this.companyReadRepository.getCompanyBySlug({ company_slug })
  // }
}
