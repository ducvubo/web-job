export async function POST(req: Request) {
  const header = req.headers
  const nonce = header.get('nonce') || ''
  const stime = header.get('stime') || ''
  const sign = header.get('sign') || ''
  const version = header.get('version') || ''

  const body = await req.json()

  const res = await fetch(`${process.env.API_BACKEND}/auth/company/login`, {
    method: 'POST',
    headers: {
      key: process.env.API_KEY_BACKEND as string,
      secret: process.env.API_SECRET_BACKEND as string,
      'Content-Type': 'application/json',
      nonce,
      stime,
      sign,
      version
    },
    body: JSON.stringify(body)
  })

  const data = await res.json()
  if (data.statusCode === 201) {
    const refreshExpires = new Date()
    refreshExpires.setDate(refreshExpires.getDate() + Number(process.env.NEXT_PUBLIC_TOKEN_EXPIRES_SSO as string)) // Set expires to 15 days from now
    const accessCookie = `cp_access_token=${
      data.metaData.cp_access_token
    }; Path=/; HttpOnly; Expires=${refreshExpires.toUTCString()}); SameSite=Lax; Secure;`
    const refreshCookie = `cp_refresh_token=${
      data.metaData.cp_refresh_token
    }; Path=/; HttpOnly; Expires=${refreshExpires.toUTCString()}; SameSite=Lax; Secure ;`

    const responseHeaders = new Headers()
    responseHeaders.append('Set-Cookie', accessCookie)
    responseHeaders.append('Set-Cookie', refreshCookie)
    return new Response(JSON.stringify({ message: 'ok ok ok', statusCode: data.statusCode }), {
      status: data.statusCode,
      headers: responseHeaders
    })
  }
  return new Response(JSON.stringify(data), {
    status: data.statusCode
  })
}
