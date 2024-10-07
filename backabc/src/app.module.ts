import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { MongooseModule } from '@nestjs/mongoose'
import { CheckSignMiddleware } from './middleware/checkSign.middleware'
import { CONNECTION_MASTER, CONNECTION_SLAVE } from './constant/connection.config'
import { CompaniesModule } from './companies/companies.module'
import { UploadModule } from './upload/upload.module'
import { CheckApiKeyMiddleware } from './middleware/checkApiKey.middleware'
import { ApikeysModule } from './apikeys/apikeys.module'
import { AuthCompanyModule } from './auth-company/auth-company.module'
import { JobsModule } from './jobs/jobs.module'
import { TagProfessionModule } from './tag-profession/tag-profession.module'
import { TagSkillsModule } from './tag-skills/tag-skills.module'
import { TagAreasModule } from './tag-areas/tag-areas.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      connectionName: CONNECTION_MASTER,
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL_MASTER'),
        directConnection: true
      })
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      connectionName: CONNECTION_SLAVE,
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL_SLAVE'),
        directConnection: true
      })
    }),
    UserModule,
    CompaniesModule,
    UploadModule,
    ApikeysModule,
    AuthCompanyModule,
    JobsModule,
    TagProfessionModule,
    TagSkillsModule,
    TagAreasModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckApiKeyMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(CheckSignMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
// export class AppModule {}
