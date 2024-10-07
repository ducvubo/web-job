import { AnyAction, isRejected, isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { isEntityError } from '../utils/helpers'
function isPayLoadErrorMessage(payload: unknown): payload is {
  data: {
    error: string
  }
  status: number
} {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'data' in payload &&
    typeof (payload as any).data?.error === 'string'
  )
}
export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action: AnyAction) => {
  if (isRejected(action)) {
    if (action.error.name === 'CustomError') {
      //lỗi liên quan đến quá trình thực thi
      toast.warn(action.error.message)
    }
  }
  if (isRejectedWithValue(action)) {
    if (isPayLoadErrorMessage(action.payload)) {
      //lỗi reject từ server chỉ có message thôi!
      toast.warn(action.payload.data.error)
    }
  }

  return next(action)
}
