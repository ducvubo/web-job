import { Module } from '@nestjs/common'
import { UploadService } from './upload.service'
import { UploadController } from './upload.controller'
import { MulterModule } from '@nestjs/platform-express'
import { MulterConfigService } from '../config/multer.config'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService
    }),
    ConfigModule
  ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
