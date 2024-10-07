import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CreateCompanyDto } from './dto/create_company.dto'
import { ResponseMessage, User } from 'src/decorator/customize'
import { AuthGuardWithSSO } from 'src/guard/authSSO.guard'
import { IUser } from 'src/user/user.interface'
import { UpdateCompanyDto } from './dto/update_company.dto'

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ResponseMessage('Thêm công ty thành công')
  @UseGuards(AuthGuardWithSSO)
  async createCompany(@Body() createCompanyDto: CreateCompanyDto, @User() user: IUser) {
    return await this.companiesService.createCompany(createCompanyDto, user)
  }

  @Get()
  @ResponseMessage('Lấy danh sách công ty')
  @UseGuards(AuthGuardWithSSO)
  async getAllCompanies(@Query('current') currentPage: string, @Query('pageSize') limit: string, @Query() qs: string) {
    return await this.companiesService.getAllCompanies(+currentPage, +limit, qs)
  }
  @Get('/all')
  @ResponseMessage('Lấy danh sách công ty')
  async getAllCompnay() {
    return await this.companiesService.getAllCompnay()
  }

  @Get('/slug/:company_slug')
  @ResponseMessage('Lấy thông tin công ty theo slug')
  async getCompanyBySlug(@Param('company_slug') company_slug: string) {
    console.log(company_slug)
    return await this.companiesService.getCompanyBySlug({ slug: company_slug })
  }

  @Get(':slug')
  @ResponseMessage('Lấy thông tin công ty theo slug')
  @UseGuards(AuthGuardWithSSO)
  async getCompanyByslug(@Param('slug') slug: string) {
    return await this.companiesService.getCompanyBySlug({ slug })
  }

  @Patch(':slug')
  @ResponseMessage('Cập nhật thông tin công ty')
  @UseGuards(AuthGuardWithSSO)
  async updateCompany(@Param('slug') slug: string, @Body() updateCompanyDto: UpdateCompanyDto, @User() user: IUser) {
    return await this.companiesService.updateCompany(slug, updateCompanyDto, user)
  }

  @Delete(':slug')
  @ResponseMessage('Xóa công ty theo slug')
  @UseGuards(AuthGuardWithSSO)
  async deleteCompany(@Param('slug') slug: string, @User() user: IUser) {
    return await this.companiesService.deleteCompany({ slug, user })
  }
}
