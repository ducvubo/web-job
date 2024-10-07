import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    // Determine the status code
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    // Determine the error message
    let message: string | string[] = 'Internal Server Error'
    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse()
      if (status === HttpStatus.BAD_REQUEST && Array.isArray(exceptionResponse['message'])) {
        // If it's a 400 error and message is an array
        message = exceptionResponse['message']
      } else if (typeof exceptionResponse === 'object' && exceptionResponse['message']) {
        // If message is present and is a string
        message = exceptionResponse['message']
      }
    }

    // Create the error response
    response.status(status).json({
      status: 'error',
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url
    })
  }
}
