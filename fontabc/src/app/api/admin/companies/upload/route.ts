import { NextResponse } from 'next/server'
import { Buffer } from 'buffer'
import { cookies } from 'next/headers'

export const POST = async (req: any) => {
  try {
    const header = req.headers
    const nonce = header.get('nonce') || ''
    const stime = header.get('stime') || ''
    const sign = header.get('sign') || ''
    const version = header.get('version') || ''
    const folder_type = header.get('folder_type') || ''
    const cookieStore = cookies()
    const access_token = cookieStore.get('access_token')?.value
    const refresh_token = cookieStore.get('refresh_token')?.value
    const formData = await req.formData()
    const file = formData.get('file')
    if (!access_token || !refresh_token) {
      return new Response(JSON.stringify({ message: 'No cookies found', statusCodes: 400 }), {
        status: 400
      })
    }
    if (!file) {
      return NextResponse.json({ error: 'No files received.' }, { status: 400 })
    }
    const buffer = Buffer.from(await file.arrayBuffer())
    const formDataToSend = new FormData()
    formDataToSend.append('file', new Blob([buffer]), file.name)
    const response = await fetch(`${process.env.API_BACKEND}/upload`, {
      method: 'POST',
      headers: {
        key: process.env.API_KEY_BACKEND as string,
        secret: process.env.API_SECRET_BACKEND as string,
        Authorization: `Bearer ${access_token}`,
        'x-rf-tk': refresh_token,
        nonce,
        stime,
        sign,
        version,
        folder_type
      },
      body: formDataToSend
    })

    const result = await response.json()

    return new Response(JSON.stringify(result), {
      status: result.statusCode
    })
  } catch (error) {
    console.log('Error occurred:', error)
    return NextResponse.json({ Message: 'Failed', status: 500 })
  }
}
