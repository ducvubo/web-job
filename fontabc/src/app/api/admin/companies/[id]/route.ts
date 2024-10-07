import { cookies } from 'next/headers'

export async function GET(req: Response) {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()
  const header = req.headers
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
  const res = await (
    await fetch(`${process.env.API_BACKEND}/companies/${id}`, {
      method: 'GET',
      headers: {
        key: process.env.API_KEY_BACKEND as string,
        secret: process.env.API_SECRET_BACKEND as string,
        Authorization: `Bearer ${access_token}`,
        'x-rf-tk': refresh_token,
        nonce,
        stime,
        sign,
        version
      }
    })
  ).json()
  return new Response(JSON.stringify(res), {
    status: res.statusCode
  })
}

export async function PATCH(req: Response) {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()
  const header = req.headers
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
  const body = await req.json()
  const res = await (
    await fetch(`${process.env.API_BACKEND}/companies/${id}`, {
      method: 'PATCH',
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
      },
      body: JSON.stringify(body)
    })
  ).json()
  return new Response(JSON.stringify(res), {
    status: res.statusCode
  })
}

export async function DELETE(req: Response) {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()
  const header = req.headers
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
  const res = await (
    await fetch(`${process.env.API_BACKEND}/companies/${id}`, {
      method: 'DELETE',
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
  ).json()
  return new Response(JSON.stringify(res), {
    status: res.statusCode
  })
}
