import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { CompaniesModule } from './companies/companies.module'
import { JobsModule } from './jobs/jobs.module'

@Module({
  imports: [ConfigModule.forRoot(), CompaniesModule, JobsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
