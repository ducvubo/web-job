import { cookies } from 'next/headers'
import type { NextApiRequest, NextApiResponse } from 'next'
export async function POST(req: Request) {
  const header = req.headers
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
  const body = await req.json()

  const res = await fetch(`${process.env.API_BACKEND}/jobs`, {
    method: 'POST',
    headers: {
      key: process.env.API_KEY_BACKEND as string,
      secret: process.env.API_SECRET_BACKEND as string,
      'x-at-tk-cp': `Bearer ${cp_access_token}`,
      'x-rf-tk-cp': `Bearer ${cp_refresh_token}`,
      'Content-Type': 'application/json',
      nonce,
      stime,
      sign,
      version
    },
    body: JSON.stringify(body)
  })

  const data = await res.json()

  return new Response(JSON.stringify(data), {
    status: data.statusCode
  })
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const current = url.searchParams.get('current')
  const pageSize = url.searchParams.get('pageSize')
  const header = req.headers
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
  const res = await (
    await fetch(`${process.env.API_BACKEND}/jobs?current=${current}&pageSize=${pageSize}`, {
      method: 'GET',
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
  ).json()
  return new Response(JSON.stringify(res), {
    status: res.statusCode
  })
}
