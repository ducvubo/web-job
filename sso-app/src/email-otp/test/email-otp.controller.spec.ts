import { Test, TestingModule } from '@nestjs/testing'
import { EmailOtpController } from './email-otp.controller'
import { EmailOtpService } from './email-otp.service'

describe('EmailOtpController', () => {
  let controller: EmailOtpController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailOtpController],
      providers: [EmailOtpService]
    }).compile()

    controller = module.get<EmailOtpController>(EmailOtpController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
