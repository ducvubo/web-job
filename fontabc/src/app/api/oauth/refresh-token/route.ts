import { genSignEndPoint } from '@/app/utils'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const cookieStore = cookies()
  const refresh_token = cookieStore.get('refresh_token')?.value
  const cp_refresh_token = cookieStore.get('cp_refresh_token')?.value
  if (refresh_token) {
    try {
      const { nonce, sign, stime, version } = genSignEndPoint()
      const res = await fetch(`${process.env.API_BACKEND}/users/refresh-token`, {
        method: 'POST',
        headers: {
          key: process.env.API_KEY_BACKEND as string,
          secret: process.env.API_SECRET_BACKEND as string,
          'x-rf-tk': refresh_token,
          'Content-Type': 'application/json',
          nonce,
          stime,
          sign,
          version
        },
      })
      const data = await res.json()
      console.log(data)
      if (data.statusCode === 201) {
        const refreshExpires = new Date()
        refreshExpires.setDate(refreshExpires.getDate() + Number(process.env.NEXT_PUBLIC_TOKEN_EXPIRES_SSO as string)) // Set expires to 15 days from now
        const accessCookie = `access_token=${
          data.metaData.access_token
        }; Path=/; HttpOnly; Expires=${refreshExpires.toUTCString()}); SameSite=Lax; Secure;`
        const refreshCookie = `refresh_token=${
          data.metaData.refresh_token
        }; Path=/; HttpOnly; Expires=${refreshExpires.toUTCString()}; SameSite=Lax; Secure ;`

        const responseHeaders = new Headers()
        responseHeaders.append('Set-Cookie', accessCookie)
        responseHeaders.append('Set-Cookie', refreshCookie)
        return new Response(JSON.stringify({ message: 'ok ok ok', statusCodes: 200, type: 'user' }), {
          status: 200,
          headers: responseHeaders
        })
      }
      if (data.statusCode === 403) {
        const accessCookie = `access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict`
        const refreshCookie = `refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict`
        const responseHeaders = new Headers()
        responseHeaders.append('Set-Cookie', accessCookie)
        responseHeaders.append('Set-Cookie', refreshCookie)
        return new Response(JSON.stringify({ message: 'Unauthorized1', statusCodes: 403 }), {
          status: 403,
          headers: responseHeaders
        })
      } else {
        const accessCookie = `access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict`
        const refreshCookie = `refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict`
        const responseHeaders = new Headers()
        responseHeaders.append('Set-Cookie', accessCookie)
        responseHeaders.append('Set-Cookie', refreshCookie)
        return new Response(JSON.stringify({ message: 'Unauthorized2', statusCodes: 401 }), {
          status: 401,
          headers: responseHeaders
        })
      }
    } catch (error) {
      const accessCookie = `access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict`
      const refreshCookie = `refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict`
      const responseHeaders = new Headers()
      responseHeaders.append('Set-Cookie', accessCookie)
      responseHeaders.append('Set-Cookie', refreshCookie)
      return new Response(JSON.stringify({ message: 'Unauthorized3', statusCodes: 403 }), {
        status: 403,
        headers: responseHeaders
      })
    }
  }
  if (cp_refresh_token) {
    try {
      const { nonce, sign, stime, version } = genSignEndPoint()
      const res = await fetch(`${process.env.API_BACKEND}/auth/company/refresh-token`, {
        method: 'POST',
        headers: {
          key: process.env.API_KEY_BACKEND as string,
          secret: process.env.API_SECRET_BACKEND as string,
          'x-rf-tk-cp': `Bearer ${cp_refresh_token}`,
          'Content-Type': 'application/json',
          nonce,
          stime,
          sign,
          version
        }
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
        return new Response(JSON.stringify({ message: 'ok ok ok', statusCodes: 200, type: 'company' }), {
          status: 200,
          headers: responseHeaders
        })
      }
      if (data.statusCode === 403) {
        const accessCookie = `cp_access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict`
        const refreshCookie = `cp_refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict`
        const responseHeaders = new Headers()
        responseHeaders.append('Set-Cookie', accessCookie)
        responseHeaders.append('Set-Cookie', refreshCookie)
        return new Response(JSON.stringify({ message: 'Unauthorized1', statusCodes: 403 }), {
          status: 403,
          headers: responseHeaders
        })
      } else {
        const accessCookie = `cp_access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict`
        const refreshCookie = `cp_refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict`
        const responseHeaders = new Headers()
        responseHeaders.append('Set-Cookie', accessCookie)
        responseHeaders.append('Set-Cookie', refreshCookie)
        return new Response(JSON.stringify({ message: 'Unauthorized1', statusCodes: 401 }), {
          status: 401,
          headers: responseHeaders
        })
      }
    } catch (error) {
      const accessCookie = `cp_access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict`
      const refreshCookie = `cp_refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict`
      const responseHeaders = new Headers()
      responseHeaders.append('Set-Cookie', accessCookie)
      responseHeaders.append('Set-Cookie', refreshCookie)
      return new Response(JSON.stringify({ message: 'Unauthorized1', statusCodes: 403 }), {
        status: 403,
        headers: responseHeaders
      })
    }
  } else {
    return new Response(JSON.stringify({ message: 'No cookies found', statusCodes: 400 }), {
      status: 400
    })
  }
}
