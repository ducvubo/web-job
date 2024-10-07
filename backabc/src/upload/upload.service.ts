import { Injectable } from '@nestjs/common'
import cloudinary from '../config/cloudinary.config'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}
  async uploadImageFromUrl() {
    try {
      const urlImage = 'https://down-vn.img.susercontent.com/file/sg-11134201-7rdvi-ly7p52wv9b7r4f'
      const folderName = 'product/shopId'
      const newFileName = 'testdemo'
      const result = await cloudinary.uploader.upload(urlImage, {
        public_id: newFileName,
        folder: folderName
      })
      return result
    } catch (error) {
      console.log('upload error: ' + error)
    }
  }

  async uploadImageFromLocal({ path, folderName, image_name }) {
    console.log(path, folderName, image_name)
    try {
      const result = await cloudinary.uploader.upload(path, {
        folder: folderName
      })
      return {
        image_url_cloud: result.secure_url,
        image_url_local: `${this.configService.get<string>('SERVER')}/${folderName}/${image_name}`,
        image_url_custom: await cloudinary.url(result.public_id, {
          height: 100,
          width: 100,
          fetch_format: 'jpg'
        })
      }
    } catch (error) {
      console.log('upload error: ' + JSON.stringify(error))
    }
  }
}
