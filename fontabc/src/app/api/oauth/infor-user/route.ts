import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const header = request.headers
  const nonce = header.get('nonce') || ''
  const stime = header.get('stime') || ''
  const sign = header.get('sign') || ''
  const version = header.get('version') || ''

  const cookieStore = cookies()
  const access_token = cookieStore.get('access_token')?.value
  const refresh_token = cookieStore.get('refresh_token')?.value

  if (!access_token || !refresh_token) {
    return new Response(JSON.stringify({ message: 'No cookies found', statusCodes: 400 }), {
      status: 400
    })
  }
  if (access_token && refresh_token) {
    try {
      const res = await fetch(`${process.env.API_BACKEND}/users/infor-user`, {
        headers: {
          key: process.env.API_KEY_BACKEND as string,
          secret: process.env.API_SECRET_BACKEND as string,
          Authorization: `Bearer ${access_token}`,
          'x-rf-tk': refresh_token,
          'Content-Type': 'application/json',
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
