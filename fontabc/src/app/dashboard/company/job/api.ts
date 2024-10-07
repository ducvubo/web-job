'use server'
import { sendRequest } from '@/lib/api'

export const getJobPagination = async (current: number, pageSize: number, type: 'delete' | 'all') => {
  const res: IBackendRes<any> = await sendRequest({
    method: 'GET',
    url: `${process.env.API_BACKEND}/jobs`,
    nextOption: {
      cache: 'no-store'
    },
    queryParams: {
      current: current,
      pageSize: pageSize,
      type
    }
  })
  return res
}

export const addJob = async (payload: any) => {
  const res: IBackendRes<any> = await sendRequest({
    method: 'POST',
    url: `${process.env.API_BACKEND}/jobs`,
    body: payload
  })
  return res
}

export const updateJob = async (jobId: string, payload: any) => {
  const res: IBackendRes<any> = await sendRequest({
    method: 'PATCH',
    url: `${process.env.API_BACKEND}/jobs/${jobId}`,
    body: payload
  })
  return res
}

export const getDataEdit = async (jobId: string) => {
  const res: IBackendRes<any> = await sendRequest({
    method: 'GET',
    url: `${process.env.API_BACKEND}/jobs/${jobId}`,
    nextOption: {
      cache: 'no-store'
    }
  })
  return res
}

export const deleteJob = async (jobId: string) => {
  const res: IBackendRes<any> = await sendRequest({
    method: 'DELETE',
    url: `${process.env.API_BACKEND}/jobs/${jobId}`
  })
  return res
}

export const getTag = async (name: string, type: string) => {
  let url = ''

  switch (type) {
    case 'profession':
      url = `${process.env.API_BACKEND}/tag-professions`
      break
    case 'skill':
      url = `${process.env.API_BACKEND}/tag-skills`
      break
    case 'area':
      url = `${process.env.API_BACKEND}/tag-areas`
      break
    default:
      throw new Error('Invalid type')
  }

  const res: IBackendRes<any> = await sendRequest({
    method: 'GET',
    url: url,
    nextOption: {
      cache: 'no-store'
    },
    queryParams: {
      tag_name: name
    }
  })
  return res
}

export const addTag = async (payload: any, type: string) => {
  let url = ''
  switch (type) {
    case 'profession':
      url = `${process.env.API_BACKEND}/tag-professions`
      break
    case 'skill':
      url = `${process.env.API_BACKEND}/tag-skills`
      break
    case 'area':
      url = `${process.env.API_BACKEND}/tag-areas`
      break
    default:
      throw new Error('Invalid type')
  }
  const res: IBackendRes<any> = await sendRequest({
    method: 'POST',
    url: url,
    body: payload
  })
  return res
}

export const updatePublishOrDraft = async (body: { status: boolean; type: string; _id: string }) => {
  const res: IBackendRes<any> = await sendRequest({
    method: 'PATCH',
    url: `${process.env.API_BACKEND}/jobs/update-pl-dr`,
    body: body
  })
  return res
}
