import { genSignEndPoint } from '@/app/utils'
import queryString from 'query-string'
import { cookies } from 'next/headers'

export const sendRequest = async <T>(props: IRequest) => {
  //type

  const { nonce, sign, stime, version } = genSignEndPoint()
  let { url, method, body, queryParams = {}, useCredentials = false, headers = {}, nextOption = {} } = props

  if (typeof window !== 'undefined') {
    throw new Error('This function is only available on the server')
  } else {
    const cookieStore = cookies()
    const access_token_user = cookieStore.get('access_token')?.value
    const refresh_token_user = cookieStore.get('refresh_token')?.value

    const cp_access_token_cp = cookieStore.get('cp_access_token')?.value
    const cp_refresh_token_cp = cookieStore.get('cp_refresh_token')?.value
    let options: any = null
    if (refresh_token_user || access_token_user) {
      options = {
        method: method,
        headers: new Headers({
          ...headers,
          'content-type': 'application/json',
          key: process.env.API_KEY_BACKEND as string,
          secret: process.env.API_SECRET_BACKEND as string,
          authorization: `Bearer ${access_token_user}`,
          'x-rf-tk': refresh_token_user,
          nonce,
          stime,
          sign,
          version
        }),
        body: body ? JSON.stringify(body) : null,
        ...nextOption
      }
    }
    if (cp_access_token_cp || cp_refresh_token_cp) {
      options = {
        method: method,
        headers: new Headers({
          ...headers,
          'content-type': 'application/json',
          key: process.env.API_KEY_BACKEND as string,
          secret: process.env.API_SECRET_BACKEND as string,
          'x-at-tk-cp': `Bearer ${cp_access_token_cp}`,
          'x-rf-tk-cp': `Bearer ${cp_refresh_token_cp}`,
          nonce,
          stime,
          sign,
          version
        }),
        body: body ? JSON.stringify(body) : null,
        ...nextOption
      }
    }
    if (!refresh_token_user && !access_token_user && !cp_access_token_cp && !cp_refresh_token_cp) {
      options = {
        method: method,
        headers: new Headers({
          ...headers,
          'content-type': 'application/json',
          key: process.env.API_KEY_BACKEND as string,
          secret: process.env.API_SECRET_BACKEND as string,
          nonce,
          stime,
          sign,
          version
        }),
        body: body ? JSON.stringify(body) : null,
        ...nextOption
      }
    }
    if (useCredentials) options.credentials = 'include'

    if (queryParams) {
      url = `${url}?${queryString.stringify(queryParams)}`
    }

    return fetch(url, options).then((res) => {
      if (res.ok) {
        return res.json() as T //generic
      } else {
        return res.json().then(function (json) {
          // to be able to access error status when you catch the error
          return {
            statusCode: res.status,
            message: json?.message ?? '',
            error: json?.error ?? ''
          } as T
        })
      }
    })
  }
}

export const sendRequestInfor = async <T>(props: IRequest) => {
  //type
  let { url, method, body, queryParams = {}, useCredentials = false, headers = {}, nextOption = {} } = props

  const options: any = {
    method: method,
    // by default setting the content-type to be json type
    headers: new Headers({
      'content-type': 'application/json',
      key: process.env.API_KEY_BACKEND as string,
      secret: process.env.API_SECRET_BACKEND as string,
      ...headers
    }),
    body: body ? JSON.stringify(body) : null,
    ...nextOption
  }
  if (useCredentials) options.credentials = 'include'

  if (queryParams) {
    url = `${url}?${queryString.stringify(queryParams)}`
  }

  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json() as T //generic
    } else {
      return res.json().then(function (json) {
        // to be able to access error status when you catch the error
        return {
          statusCode: res.status,
          message: json?.message ?? '',
          error: json?.error ?? ''
        } as T
      })
    }
  })
}

export const sendRequestFile = async <T>(props: IRequest) => {
  const { nonce, sign, stime, version } = genSignEndPoint()
  //type
  let { url, method, body, queryParams = {}, useCredentials = false, headers = {}, nextOption = {} } = props
  if (typeof window !== 'undefined') {
    throw new Error('This function is only available on the server')
  } else {
    const cookieStore = cookies()
    const access_token_user = cookieStore.get('access_token')?.value
    const refresh_token_user = cookieStore.get('refresh_token')?.value

    const cp_access_token_cp = cookieStore.get('cp_access_token')?.value
    const cp_refresh_token_cp = cookieStore.get('cp_refresh_token')?.value
    let options: any = null
    if (access_token_user || refresh_token_user) {
      options = {
        method: method,
        // by default setting the content-type to be json type
        headers: new Headers({
          key: process.env.API_KEY_BACKEND as string,
          secret: process.env.API_SECRET_BACKEND as string,
          authorization: `Bearer ${access_token_user}`,
          'x-rf-tk': refresh_token_user,
          nonce,
          stime,
          sign,
          version,
          ...headers
        }),
        body: body ? body : null,
        ...nextOption
      }
    }
    if (cp_access_token_cp || cp_refresh_token_cp) {
      options = {
        method: method,
        // by default setting the content-type to be json type
        headers: new Headers({
          key: process.env.API_KEY_BACKEND as string,
          secret: process.env.API_SECRET_BACKEND as string,
          'x-at-tk-cp': `Bearer ${cp_access_token_cp}`,
          'x-rf-tk-cp': `Bearer ${cp_refresh_token_cp}`,
          nonce,
          stime,
          sign,
          version,
          ...headers
        }),
        body: body ? body : null,
        ...nextOption
      }
    }
    if (!refresh_token_user && !access_token_user && !cp_access_token_cp && !cp_refresh_token_cp) {
      options = {
        method: method,
        // by default setting the content-type to be json type
        headers: new Headers({
          key: process.env.API_KEY_BACKEND as string,
          secret: process.env.API_SECRET_BACKEND as string,
          nonce,
          stime,
          sign,
          version,
          ...headers
        }),
        body: body ? body : null,
        ...nextOption
      }
    }

    if (useCredentials) options.credentials = 'include'

    if (queryParams) {
      url = `${url}?${queryString.stringify(queryParams)}`
    }

    return fetch(url, options).then((res) => {
      if (res.ok) {
        return res.json() as T //generic
      } else {
        return res.json().then(function (json) {
          // to be able to access error status when you catch the error
          return {
            statusCode: res.status,
            message: json?.message ?? '',
            error: json?.error ?? ''
          } as T
        })
      }
    })
  }
}
