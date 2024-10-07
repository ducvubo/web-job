import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express'
// import * as fs from 'fs'
import { promises as fsPromises } from 'fs'
import { diskStorage } from 'multer'
import * as path from 'path'
@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  //tra ra duong link thu muc root
  getRootPath = () => {
    return process.cwd()
  }

  //thu muc upload chua ton tai thif tao thu muc moi, con da ton tai thi thoi
  async ensureExists(targetDirectory: string) {
    try {
      await fsPromises.mkdir(targetDirectory, { recursive: true })
      console.log('Directory successfully created, or it already exists.')
    } catch (error) {
      if (!error) {
        console.log('Directory succcesfully created, or it already exists.')
        return
      }
      switch (error.code) {
        case 'EEXIST':
          //Error
          // Requested location already exists, but it's not a directory
          break
        case 'ENOTDIR':
          //Error
          //The parent hierarchy contains a file with the same name as the
          // you're trying to create
          break
        default:
          //Some other error like permisson denied
          console.error(error)
          break
      }
    }
    // fs.mkdir(targetDirectory, { recursive: true }, (error) => {
    //   if (!error) {
    //     console.log('Directory succcesfully created, or it already exists.')
    //     return
    //   }
    //   switch (error.code) {
    //     case 'EEXIST':
    //       //Error
    //       // Requested location already exists, but it's not a directory
    //       break
    //     case 'ENOTDIR':
    //       //Error
    //       //The parent hierarchy contains a file with the same name as the
    //       // you're trying to create
    //       break
    //     default:
    //       //Some other error like permisson denied
    //       console.error(error)
    //       break
    //   }
    // })
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      //cau hinh luu anh
      storage: diskStorage({
        destination: async (req, file, cb) => {
          const folder = req?.headers?.folder_type ?? 'default'
          await this.ensureExists(`public/${folder}`)
          cb(null, path.join(this.getRootPath(), `public/${folder}`))
        },
        filename: (req, file, cb) => {
          //get image extension
          const extName = path.extname(file.originalname)

          //get image's name (without extension)
          const baseName = path.basename(file.originalname, extName)
          const finalName = `${baseName}-${Date.now()}${extName}`
          cb(null, finalName)
        }
      }),
      fileFilter: (req, file, cb) => {
        const allowedFileTypes = ['jpg', 'jpeg', 'png', 'webp']
        const fileExtension = file.originalname.split('.').pop().toLocaleLowerCase()
        const isValidFileType = allowedFileTypes.includes(fileExtension)
        if (!isValidFileType) {
          cb(new HttpException('invalid file type', HttpStatus.UNPROCESSABLE_ENTITY), null)
        } else cb(null, true)
      },
      limits: {
        fileSize: 1024 * 1024 * 5
      }
    }
  }
}
