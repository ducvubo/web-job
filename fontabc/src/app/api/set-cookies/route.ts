export async function POST(req: Request) {
  const body = await req.json()

  if (body.access_token && body.refresh_token) {
    const refreshExpires = new Date()
    refreshExpires.setDate(refreshExpires.getDate() + Number(process.env.NEXT_PUBLIC_TOKEN_EXPIRES_SSO as string)) // Set expires to 15 days from now
    const accessCookie = `access_token=${
      body.access_token
    }; Path=/; HttpOnly; Expires=${refreshExpires.toUTCString()}); SameSite=Lax; Secure;`
    const refreshCookie = `refresh_token=${
      body.refresh_token
    }; Path=/; HttpOnly; Expires=${refreshExpires.toUTCString()}; SameSite=Lax; Secure ;`

    const responseHeaders = new Headers()
    responseHeaders.append('Set-Cookie', accessCookie)
    responseHeaders.append('Set-Cookie', refreshCookie)
    return new Response(JSON.stringify({ message: 'ok ok ok', statusCodes: 200, type: 'user' }), {
      status: 200,
      headers: responseHeaders
    })
  } else if (body.cp_access_token && body.cp_fresh_token) {
    const refreshExpires = new Date()
    refreshExpires.setDate(refreshExpires.getDate() + Number(process.env.NEXT_PUBLIC_TOKEN_EXPIRES_SSO as string)) // Set expires to 15 days from now
    const accessCookie = `cp_access_token=${
      body.cp_access_token
    }; Path=/; HttpOnly; Expires=${refreshExpires.toUTCString()}); SameSite=Lax; Secure;`
    const refreshCookie = `cp_refresh_token=${
      body.cp_refresh_token
    }; Path=/; HttpOnly; Expires=${refreshExpires.toUTCString()}; SameSite=Lax; Secure ;`

    const responseHeaders = new Headers()
    responseHeaders.append('Set-Cookie', accessCookie)
    responseHeaders.append('Set-Cookie', refreshCookie)
    return new Response(JSON.stringify({ message: 'ok ok ok', statusCodes: 200, type: 'company' }), {
      status: 200,
      headers: responseHeaders
    })
  } else {
    return new Response(JSON.stringify({ message: 'No tokens found', statusCodes: 400 }), {
      status: 400
    })
  }
}
