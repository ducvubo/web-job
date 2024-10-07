import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

export const RESPONSE_MESSAGE = 'response_message'
export const ResponseMessage = (message: string, statusCode?: number) =>
  SetMetadata(RESPONSE_MESSAGE, { message, statusCode })

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})

export const Company = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.company
})

export const IS_PUBLIC_PERMISSION = 'isPublicPermission'
export const SkipCheckPerMission = () => SetMetadata(IS_PUBLIC_PERMISSION, true)
