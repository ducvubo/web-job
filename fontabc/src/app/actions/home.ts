'use server'
import { sendRequest } from '@/lib/api'

export const getJobHomePage = async (current: number, pageSize: number) => {
  const res: IBackendRes<any> = await sendRequest({
    method: 'GET',
    url: `${process.env.API_BACKEND}/jobs/home`,
    nextOption: {
      cache: 'no-store'
    },
    queryParams: {
      current: current,
      pageSize: pageSize
    }
  })

  return res
}
