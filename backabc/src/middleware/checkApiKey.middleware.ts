import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { ApikeysService } from 'src/apikeys/apikeys.service'

@Injectable()
export class CheckApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly apiKeyService: ApikeysService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { key, secret }: any = req.headers
    if (!key || !secret) throw new HttpException('Sign token không hợp lệ api key', HttpStatus.FORBIDDEN)
    const apiKey = await this.apiKeyService.findOne({ key, secret })
    if (!apiKey) throw new HttpException('Sign token không hợp lệ1 key', HttpStatus.FORBIDDEN)
    next()
  }
}
