import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { JobsService } from './jobs.service'
import { Company, ResponseMessage } from 'src/decorator/customize'
import { AuthGuardCompany } from 'src/guard/authCompany.guard'
import { CreateJobDto } from './dto/create-job.dto'
import { ICompany } from 'src/companies/company.interface'
import { UpdateJobDto } from './dto/update-job.dto'
import { ElasticsearchService } from '@nestjs/elasticsearch'

@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  // @Post('test1')
  // @ResponseMessage('Test elastic search')
  // async search(q: string) {
  //   try {
  //     const result = await this.elasticsearchService.search({
  //       index: 'JobSerach'
  //     })
  //     // const result = await this.elasticsearchService.indices.delete({
  //     //   index:
  //     // })
  //     return result
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // }

  @Post()
  @ResponseMessage('Tạo tin tuyển dụng mới')
  @UseGuards(AuthGuardCompany)
  async createJob(@Body() createJobDto: CreateJobDto, @Company() company: ICompany) {
    // console.log(createJobDto)
    return await this.jobsService.createJob(createJobDto, company)
  }

  @Get()
  @ResponseMessage('Lấy danh sách job của công ty')
  @UseGuards(AuthGuardCompany)
  async getAllJobWithCompany(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
    @Company() company: ICompany
  ) {
    return await this.jobsService.getAllJobWithCompany(+currentPage, +limit, qs, company)
  }

  @Get('/home')
  @ResponseMessage('Lấy danh sách job hiển thị trang chủ')
  @UseGuards(AuthGuardCompany)
  async getPaginationJobHome(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string
  ) {
    return await this.jobsService.getPaginationJobHome(+currentPage, +limit, qs)
  }

  @Patch('/update-pl-dr')
  @ResponseMessage('Cập nhật job trạng thái publish hoặc draft')
  @UseGuards(AuthGuardCompany)
  async updatePublishOrDraftStatus(
    @Body() body: { status: boolean; type: string; _id: string },
    @Company() company: ICompany
  ) {
    return await this.jobsService.updatePublishOrDraftStatus(body, company)
  }

  @Get(':slug')
  @ResponseMessage('Lấy thông tin job theo công ty và slug')
  @UseGuards(AuthGuardCompany)
  async getCompanyById(@Param('slug') slug: string, @Company() company: ICompany) {
    return await this.jobsService.getJobWithCompanyBySlug({ slug, company })
  }

  @Patch(':slug')
  @ResponseMessage('Cập nhật thông tin job')
  @UseGuards(AuthGuardCompany)
  async updateCompany(@Param('slug') slug: string, @Body() upDateJobDto: UpdateJobDto, @Company() company: ICompany) {
    return await this.jobsService.updateJob(slug, upDateJobDto, company)
  }

  @Delete(':slug')
  @ResponseMessage('Xóa job theo ID')
  @UseGuards(AuthGuardCompany)
  async deleteCompany(@Param('slug') slug: string, @Company() company: ICompany) {
    return await this.jobsService.deleteJob({ slug, company })
  }

  @Get('test')
  @ResponseMessage('Test rabitmq')
  async test() {
    return {
      message: 'Test rabitmq'
    }
  }
}
