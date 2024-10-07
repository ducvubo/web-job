import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
// import md5 from 'md5'
import * as md5 from 'md5'
import { SIGN } from 'src/constant/key.redis'
import { getCacheIO, setCacheIOExpiration } from 'src/utils/cache'
@Injectable()
export class CheckSignMiddleware implements NestMiddleware {
  constructor() {}
  genSign(headerKey) {
    const keyToken = 'vuducbokeytoken'
    const sortKeys = []
    for (const key in headerKey) {
      if (key !== 'sign') {
        sortKeys.push(key)
      }
    }
    sortKeys.sort()
    let headersString = ''
    sortKeys.forEach((key) => {
      headersString += key + headerKey[key]
    })

    return md5(headersString + keyToken + 'v1').toString()
  }

  async use(req: Request, res: Response, next: NextFunction) {
    // const keyToken = 'vuducbokeytoken'
    const signClient = req.headers['sign']
    const nonce = req.headers['nonce']
    const stime: any = req.headers['stime']

    const signExist = await getCacheIO({ key: `${SIGN}${signClient}` })
    if (signExist) throw new HttpException('Sign token không hợp lệ12', HttpStatus.FORBIDDEN)

    if (!stime || !signClient || !nonce) throw new HttpException('Sign token không hợp lệ', HttpStatus.FORBIDDEN)

    const isTime = Math.floor((Date.now() - stime) / 1000)
    if (isTime > 30) throw new HttpException('Sign token không hợp lệ', HttpStatus.FORBIDDEN)

    const signServer = this.genSign({ nonce, stime })
    if (signClient !== signServer) throw new HttpException('Sign token không hợp lệ', HttpStatus.FORBIDDEN)

    await setCacheIOExpiration({ key: `${SIGN}${signClient}`, value: signClient, expirationInSeconds: 20 })

    next()
  }
}
