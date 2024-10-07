import { forwardRef, Module } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CompaniesController } from './companies.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { Company, CompanySchema } from './model/company.schema'
import { CONNECTION_MASTER, CONNECTION_SLAVE } from 'src/constant/connection.config'
import { UserModule } from 'src/user/user.module'
import { CompanyReadRepository } from './model/company-read.repo'
import { CompanyWriteRepository } from './model/company-write.repo'
import { AuthCompanyModule } from 'src/auth-company/auth-company.module'
import { CompanyQueue } from './companies.rabbitmq'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }], CONNECTION_MASTER),
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }], CONNECTION_SLAVE),
    ConfigModule,
    UserModule,
    forwardRef(() => AuthCompanyModule)
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService, CompanyReadRepository, CompanyWriteRepository, CompanyQueue],
  exports: [CompaniesService]
})
export class CompaniesModule {}
