import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { RESPONSE_MESSAGE } from 'src/decorator/customize'
// custom message tra ve frontend
export interface Response<T> {
  statusCode: number
  message?: string
  metaData: any
  tacgia: string
}

interface ResponseMessage {
  message?: string
  statusCode?: number
}

@Injectable()
export class TransformIntercaptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const handler = context.getHandler()
    const message = this.reflector.get<ResponseMessage>(RESPONSE_MESSAGE, handler).message || ''
    const codeResponseMessage = this.reflector.get<ResponseMessage>(RESPONSE_MESSAGE, handler).statusCode || ''
    const codeHeader = context.switchToHttp().getResponse().statusCode
    return next.handle().pipe(
      map((data) => ({
        // statusCode: context.switchToHttp().getResponse().statusCode,
        statusCode: codeResponseMessage ? codeResponseMessage : codeHeader,
        message,
        metaData: data,
        tacgia: 'Vu Duc Bo'
      }))
    )
  }
}
