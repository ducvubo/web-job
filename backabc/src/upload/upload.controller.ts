import { Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common'
import { UploadService } from './upload.service'
import { ResponseMessage } from 'src/decorator/customize'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ResponseMessage('Upload image from local')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImageFromLocal(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    if (!file) {
      throw new Error('No file provided')
    }
    return await this.uploadService.uploadImageFromLocal({
      path: file.path,
      folderName: req.headers.folder_type,
      image_name: file.filename
    })
  }
}
