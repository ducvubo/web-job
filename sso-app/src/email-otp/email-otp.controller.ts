import { Body, Controller, Post } from '@nestjs/common'
import { EmailOtpService } from './email-otp.service'
import { Public, ResponseMessage } from 'src/decorator/customize'
import { VerifyOtpDto } from './dto/verifyOtp.dto'

@Controller('email-otp')
export class EmailOtpController {
  constructor(private readonly emailOtpService: EmailOtpService) {}
  @Post('')
  @Public()
  @ResponseMessage('Check OTP')
  async verifyOtp(@Body() verifyOtp: VerifyOtpDto) {
    return this.emailOtpService.verifyOtp(verifyOtp)
  }
}
