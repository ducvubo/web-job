import { Module } from '@nestjs/common'
import { JobsService } from './jobs.service'
import { JobsController } from './jobs.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Job, JobSchema } from './model/job.model'
import { CONNECTION_MASTER, CONNECTION_SLAVE } from 'src/constant/connection.config'
import { JobReadRepository } from './model/job-read.repo'
import { JobWriteRepository } from './model/job-write.repo'
import { AuthCompanyModule } from 'src/auth-company/auth-company.module'
import { CompaniesModule } from 'src/companies/companies.module'
import { JobQueue } from './jobs.rabitmq'
import { ElasticsearchModule } from '@nestjs/elasticsearch'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }], CONNECTION_MASTER),
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }], CONNECTION_SLAVE),
    ElasticsearchModule.registerAsync({
      useFactory: () => ({
        node: 'https://localhost:9200',
        auth: {
          username: 'elastic',
          password: 'Elyh5fI7P0Vt+EF50oVY'
        },
        tls: {
          rejectUnauthorized: false
        }
      })
    }),
    AuthCompanyModule,
    CompaniesModule
  ],
  controllers: [JobsController],
  providers: [JobsService, JobReadRepository, JobWriteRepository, JobQueue]
})
export class JobsModule {}
