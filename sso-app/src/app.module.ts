import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { ApiKeyModule } from './api-key/api-key.module'
import { EmailOtpModule } from './email-otp/email-otp.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      connectionName: 'sso_master',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL_MASTER'),
        directConnection: true
      })
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      connectionName: 'sso_slave',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL_SLAVE'),
        directConnection: true
      })
    }),

    AuthModule,
    UserModule,
    ApiKeyModule,
    EmailOtpModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
