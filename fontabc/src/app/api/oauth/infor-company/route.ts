import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const header = request.headers
  const nonce = header.get('nonce') || ''
  const stime = header.get('stime') || ''
  const sign = header.get('sign') || ''
  const version = header.get('version') || ''

  const cookieStore = cookies()
  const cp_access_token = cookieStore.get('cp_access_token')?.value
  const cp_refresh_token = cookieStore.get('cp_refresh_token')?.value

  if (!cp_access_token || !cp_refresh_token) {
    return new Response(JSON.stringify({ message: 'No cookies found', statusCodes: 400 }), {
      status: 400
    })
  }
  if (cp_access_token && cp_refresh_token) {
    try {
      const res = await fetch(`${process.env.API_BACKEND}/auth/company/get-infor`, {
        headers: {
          key: process.env.API_KEY_BACKEND as string,
          secret: process.env.API_SECRET_BACKEND as string,
          'x-at-tk-cp': `Bearer ${cp_access_token}`,
          'x-rf-tk-cp': `Bearer ${cp_refresh_token}`,
          nonce,
          stime,
          sign,
          version
        }
      })
      const data = await res.json()
      if (data.statusCode === 200) {
        return new Response(JSON.stringify({ data: data.metaData, statusCodes: 200 }), {
          status: 200
        })
      }
      if (data.statusCode === 403) {
        return new Response(JSON.stringify({ message: 'Forbidden', statusCodes: 403 }), {
          status: 403
        })
      } else {
        return new Response(JSON.stringify({ message: 'Unauthorized', statusCodes: 401 }), {
          status: 401
        })
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
}
