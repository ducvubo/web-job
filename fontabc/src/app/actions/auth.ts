'use server'

import { sendRequest, sendRequestInfor } from '@/lib/api'
import { deleteCookie } from '@/lib/session'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
import { toast } from 'sonner'

export const refreshToken = async () => {
  const cookieStore = cookies()
  const refresh_token_user = cookieStore.get('refresh_token')?.value
  const cp_refresh_token_cp = cookieStore.get('cp_refresh_token')?.value

  if (refresh_token_user) {
    const res: IBackendRes<{ access_token: string; refresh_token: string }> = await sendRequest({
      url: `${process.env.API_BACKEND}/users/refresh-token`,
      method: 'POST'
    })
    if (res.statusCode === 201 && res.metaData && res.metaData.access_token && res.metaData.refresh_token) {
      const resPro: [any, any, IBackendRes<any>] = await Promise.all([
        await cookies().set({
          name: 'access_token',
          value: res.metaData.access_token,
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 15
        }),
        await cookies().set({
          name: 'refresh_token',
          value: res.metaData.refresh_token,
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 15
        }),
        await sendRequest({
          url: `${process.env.API_BACKEND}/users/infor-user`,
          method: 'GET'
        })
      ])

      const getInforUser: IBackendRes<any> = await resPro[2]
      if (getInforUser.statusCode === 200) {
        return {
          message: 'get infor user success',
          code: 1,
          type: 'user',
          data: getInforUser.metaData
        }
      } else {
        return {
          message: 'get infor user error',
          code: 0
        }
      }
    } else {
      deleteCookie('access_token')
      deleteCookie('refresh_token')
      deleteCookie('cp_access_token')
      deleteCookie('cp_refresh_token')
      return {
        message: 'Refresh token error',
        code: 0
      }
    }
  } else if (cp_refresh_token_cp) {
    const res: IBackendRes<{ cp_access_token: string; cp_refresh_token: string }> = await sendRequest({
      url: `${process.env.API_BACKEND}/auth/company/refresh-token`,
      method: 'POST'
    })
    if (res.statusCode === 201 && res.metaData && res.metaData.cp_refresh_token && res.metaData.cp_access_token) {
      const resPro: [any, any, IBackendRes<any>] = await Promise.all([
        await cookies().set({
          name: 'cp_refresh_token',
          value: res.metaData.cp_refresh_token,
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 15
        }),
        await cookies().set({
          name: 'cp_access_token',
          value: res.metaData.cp_access_token,
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 15
        }),
        await sendRequest({
          url: `${process.env.API_BACKEND}/auth/company/get-infor`,
          method: 'GET',
          nextOption: {
            cache: 'no-store'
          }
        })
      ])
      if (resPro[2].statusCode === 200) {
        return {
          message: 'get infor company success',
          code: 1,
          type: 'company',
          data: resPro[2].metaData
        }
        // redirect('/dashboard/company/job')
      } else {
        return {
          message: 'get infor company error',
          code: 0
        }
      }
    } else {
      deleteCookie('cp_access_token')
      deleteCookie('cp_refresh_token')
      deleteCookie('access_token')
      deleteCookie('refresh_token')
      return {
        message: 'Refresh token error',
        code: 0,
        type: 'company'
      }
    }
  }
}

// export const refreshTokenMid = async (req: NextRequest, res: NextResponse) => {
//   const cookieStore = cookies()

//   const refresh_token_user = req.cookies.get('refresh_token')?.value
//   const cp_refresh_token_cp = req.cookies.get('cp_refresh_token')?.value

//   if (refresh_token_user) {
//     const response = await sendRequest({
//       url: `${process.env.API_BACKEND}/users/refresh-token`,
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${refresh_token_user}`
//       }
//     })

//     if (response.statusCode === 201 && response.metaData) {
//       const { access_token, refresh_token } = response.metaData

//       res.cookies.set('access_token', access_token, {
//         httpOnly: true,
//         secure: true,
//         sameSite: 'lax',
//         path: '/',
//         maxAge: 60 * 60 * 24 * 15
//       })

//       res.cookies.set('refresh_token', refresh_token, {
//         httpOnly: true,
//         secure: true,
//         sameSite: 'lax',
//         path: '/',
//         maxAge: 60 * 60 * 24 * 15
//       })

//       return { success: true }
//     } else {
//       res.cookies.delete('access_token')
//       res.cookies.delete('refresh_token')
//       return { redirectTo: '/' }
//     }
//   }

//   if (cp_refresh_token_cp) {
//     const response = await sendRequest({
//       url: `${process.env.API_BACKEND}/auth/company/refresh-token`,
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${cp_refresh_token_cp}`
//       }
//     })

//     if (response.statusCode === 201 && response.metaData) {
//       const { cp_access_token, cp_refresh_token } = response.metaData

//       res.cookies.set('cp_access_token', cp_access_token, {
//         httpOnly: true,
//         secure: true,
//         sameSite: 'lax',
//         path: '/',
//         maxAge: 60 * 60 * 24 * 15
//       })

//       res.cookies.set('cp_refresh_token', cp_refresh_token, {
//         httpOnly: true,
//         secure: true,
//         sameSite: 'lax',
//         path: '/',
//         maxAge: 60 * 60 * 24 * 15
//       })

//       return { success: true }
//     } else {
//       res.cookies.delete('cp_access_token')
//       res.cookies.delete('cp_refresh_token')
//       return { redirectTo: '/' }
//     }
//   }

//   return null
// }

// export const refreshTokenMid = async (req: NextRequest, res: NextResponse) => {
//   const cookieStore = cookies()
//   const refresh_token_user = cookieStore.get('refresh_token')?.value
//   const cp_refresh_token_cp = cookieStore.get('cp_refresh_token')?.value

//   if (refresh_token_user) {
//     const response: IBackendRes<{ access_token: string; refresh_token: string }> = await sendRequest({
//       url: `${process.env.API_BACKEND}/users/refresh-token`,
//       method: 'POST'
//     })
//     console.log(response)
//     if (
//       response.statusCode === 201 &&
//       response.metaData &&
//       response.metaData.access_token &&
//       response.metaData.refresh_token
//     ) {
//       const resPro: [any, any, IBackendRes<any>] = await Promise.all([
//         res.cookies.set({
//           name: 'access_token',
//           value: response.metaData.access_token,
//           path: '/',
//           httpOnly: true,
//           secure: true,
//           sameSite: 'lax',
//           maxAge: 60 * 60 * 24 * 15
//         }),
//         res.cookies.set({
//           name: 'refresh_token',
//           value: response.metaData.refresh_token,
//           path: '/',
//           httpOnly: true,
//           secure: true,
//           sameSite: 'lax',
//           maxAge: 60 * 60 * 24 * 15
//         }),
//         await sendRequestInfor({
//           url: `${process.env.API_BACKEND}/auth/company/get-infor`,
//           method: 'GET',
//           headers: {
//             authorization: `Bearer ${response.metaData.access_token}`,
//             'x-rf-tk': response.metaData.refresh_token
//           },
//           nextOption: {
//             cache: 'no-store'
//           }
//         })
//       ])

//       const getInforUser: IBackendRes<any> = await resPro[2]
//       if (getInforUser.statusCode === 200) {
//         res.cookies.set({
//           name: 'session_us',
//           value: resPro[2].metaData,
//           path: '/',
//           httpOnly: true,
//           secure: true,
//           sameSite: 'lax',
//           maxAge: 60 * 60 * 24 * 15
//         })
//         return {
//           message: 'get infor user success',
//           code: 1,
//           type: 'user',
//           data: getInforUser.metaData
//         }
//       } else {
//         return {
//           message: 'get infor user error',
//           code: 0
//         }
//       }
//     } else {
//       res.cookies.delete('cp_access_token')
//       res.cookies.delete('cp_refresh_token')
//       res.cookies.delete('access_token')
//       res.cookies.delete('refresh_token')
//       return {
//         message: 'Refresh token error',
//         code: 0
//       }
//     }
//   } else if (cp_refresh_token_cp) {
//     const response: IBackendRes<{ cp_access_token: string; cp_refresh_token: string }> = await sendRequest({
//       url: `${process.env.API_BACKEND}/auth/company/refresh-token`,
//       method: 'POST'
//     })
//     console.log('response::::::::', response)
//     if (
//       response.statusCode === 201 &&
//       response.metaData &&
//       response.metaData.cp_refresh_token &&
//       response.metaData.cp_access_token
//     ) {
//       // const resPro: [any, any, IBackendRes<any>] = await Promise.all([
//       //   res.cookies.set({
//       //     name: 'cp_refresh_token',
//       //     value: response.metaData.cp_refresh_token,
//       //     path: '/',
//       //     httpOnly: true,
//       //     secure: true,
//       //     sameSite: 'lax',
//       //     maxAge: 60 * 60 * 24 * 15
//       //   }),
//       //   res.cookies.set({
//       //     name: 'cp_access_token',
//       //     value: response.metaData.cp_access_token,
//       //     path: '/',
//       //     httpOnly: true,
//       //     secure: true,
//       //     sameSite: 'lax',
//       //     maxAge: 60 * 60 * 24 * 15
//       //   }),
//       const resInfor: IBackendRes<any> = await sendRequestInfor({
//         url: `${process.env.API_BACKEND}/auth/company/get-infor`,
//         method: 'GET',
//         headers: {
//           'x-at-tk-cp': `Bearer ${response.metaData.cp_access_token}`,
//           'x-rf-tk-cp': `Bearer ${response.metaData.cp_refresh_token}`
//         },
//         nextOption: {
//           cache: 'no-store'
//         }
//       })
//       // ])

//       console.log('resPro[2].metaData::::::', resInfor)
//       if (resInfor.statusCode === 200) {
//         res.cookies.set({
//           name: 'session_cp',
//           value: resInfor.metaData,
//           path: '/',
//           httpOnly: true,
//           secure: true,
//           sameSite: 'lax',
//           maxAge: 60 * 60 * 24 * 15
//         })
//         res.cookies.set({
//           name: 'cp_refresh_token',
//           value: response.metaData.cp_refresh_token,
//           path: '/',
//           httpOnly: true,
//           secure: true,
//           sameSite: 'lax',
//           maxAge: 60 * 60 * 24 * 15
//         }),
//           res.cookies.set({
//             name: 'cp_access_token',
//             value: response.metaData.cp_access_token,
//             path: '/',
//             httpOnly: true,
//             secure: true,
//             sameSite: 'lax',
//             maxAge: 60 * 60 * 24 * 15
//           })
//         return {
//           message: 'get infor company success',
//           code: 1,
//           type: 'company',
//           data: resInfor.metaData
//         }
//         // redirect('/dashboard/company/job')
//       } else {
//         return {
//           message: 'get infor company error',
//           code: 0
//         }
//       }
//     } else {
//       res.cookies.delete('cp_access_token')
//       res.cookies.delete('cp_refresh_token')
//       res.cookies.delete('access_token')
//       res.cookies.delete('refresh_token')
//       return {
//         message: 'Refresh token error',
//         code: 0,
//         type: 'company'
//       }
//     }
//   }
// }

export const loginSSO = async ({ access_token, refresh_token }: { access_token: string; refresh_token: string }) => {
  if (!access_token || !refresh_token) {
    return {
      message: 'Access token or refresh token is missing',
      code: 0
    }
  }
  const checkToken: IBackendRes<{ access_token: string; refresh_token: string }> = await sendRequest({
    url: `${process.env.API_BACKEND}/users/sso`,
    method: 'POST',
    body: { access_token, refresh_token }
  })
  if (checkToken.statusCode === 201) {
    await Promise.all([
      await cookies().set({
        name: 'access_token',
        value: access_token,
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 15
      }),
      await cookies().set({
        name: 'refresh_token',
        value: refresh_token,
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 15
      })
    ])

    const getInforUser: IBackendRes<any> = await sendRequest({
      url: `${process.env.API_BACKEND}/users/infor-user`,
      method: 'GET'
    })

    if (getInforUser.statusCode === 200) {
      return {
        message: 'get infor user success',
        code: 1,
        type: 'user',
        data: getInforUser.metaData
      }
    } else {
      return {
        message: 'get infor user error',
        code: 0
      }
    }
  } else {
    return {
      message: 'Login sso error',
      code: 0
    }
  }
}

export const loginCompany = async ({
  company_email,
  company_password
}: {
  company_email: string
  company_password: string
}) => {
  const res: IBackendRes<{ cp_access_token: string; cp_refresh_token: string }> = await sendRequest({
    url: `${process.env.API_BACKEND}/auth/company/login`,
    method: 'POST',
    body: { company_email, company_password }
  })

  console.log(res)

  if (res.statusCode === 400) {
    return {
      message: 'Email or password incorrect',
      code: -1,
      data: res.message
    }
  } else if (res.statusCode === 409) {
    return {
      message: 'Email or password incorrect',
      code: -2,
      data: res.message
    }
  } else if (res.statusCode === 201) {
    if (res.metaData && res.metaData.cp_access_token && res.metaData.cp_refresh_token) {
      const resPro: [any, any, any] = await Promise.all([
        await cookies().set({
          name: 'cp_access_token',
          value: res?.metaData?.cp_access_token,
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 15
        }),
        await cookies().set({
          name: 'cp_refresh_token',
          value: res.metaData?.cp_refresh_token,
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 15
        }),
        await sendRequest({
          url: `${process.env.API_BACKEND}/auth/company/get-infor`,
          method: 'GET'
        })
      ])

      if (resPro[2].statusCode === 200) {
        return {
          message: 'get infor company success',
          code: 1,
          type: 'company',
          data: resPro[2].metaData
        }
      } else {
        return {
          message: 'get infor company error',
          code: 0
        }
      }
    }
  } else {
    return {
      message: 'Login company error',
      code: 0
    }
  }
}
