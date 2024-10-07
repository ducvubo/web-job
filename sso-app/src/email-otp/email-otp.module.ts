import { Module } from '@nestjs/common'
import { EmailOtpService } from './email-otp.service'
import { EmailOtpController } from './email-otp.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { emailOtp, emailOtpSchema } from './schema/email.schema'
import { UserModule } from 'src/user/user.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: emailOtp.name, schema: emailOtpSchema }], 'sso_master'),
    MongooseModule.forFeature([{ name: emailOtp.name, schema: emailOtpSchema }], 'sso_slave'),
    UserModule,
    AuthModule
  ],
  controllers: [EmailOtpController],
  providers: [EmailOtpService]
})
export class EmailOtpModule {}
