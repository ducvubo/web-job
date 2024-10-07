'use client'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { inforUserState, startAppUser } from './inforUser.slice'
import { inforCompanyState, startAppCompany } from './inforCompany.slice'
import { loginSSO, refreshToken } from '@/app/actions/auth'
import { toast } from 'sonner'
import { useLoading } from '@/context/LoadingContext'
export default function RefreshToken() {
  const { setLoading } = useLoading()
  const Params = useSearchParams()
  const access_token = Params.get('access_token')
  const refresh_token = Params.get('refresh_token')
  const searchParams = useSearchParams()
  const dispatch = useDispatch()
  const router = useRouter()

  const runAppUser = (inforUser: inforUserState) => {
    dispatch(startAppUser(inforUser))
  }
  const runAppCompany = (inforCompany: inforCompanyState) => {
    dispatch(startAppCompany(inforCompany))
  }

  const fetchData = async () => {
    try {
      const Refresh_Token = await refreshToken()
      if (Refresh_Token?.code === 1 && Refresh_Token?.type === 'user') {
        toast('success user')
        runAppUser(Refresh_Token?.data)
      } else if (Refresh_Token?.code === 1 && Refresh_Token?.type === 'company') {
        toast('success company')
        runAppCompany(Refresh_Token?.data)
      } else {
        toast('Đã có lỗi xảy ra vui lòng thử lại')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const fetchDataSSO = async () => {
    setLoading(true)

    const loginWithSSO = await loginSSO({ access_token: access_token ?? '', refresh_token: refresh_token ?? '' })
    if (loginWithSSO?.code === 1) {
      setTimeout(() => {
        setLoading(false)
        toast('Đăng nhập thành công')
        runAppUser(loginWithSSO.data)
        router.push('/')
      }, 300)
    } else {
      setLoading(false)
      toast.error('Đã có lỗi xảy ra vui lòng thử lại')
      router.push('/')
    }
  }

  useLayoutEffect(() => {
    if (access_token || refresh_token) {
      fetchDataSSO()
      const interval = setInterval(() => {
        fetchData() // Gọi lại API mỗi phút
      }, 1000 * 60 * 10)
      return () => clearInterval(interval)
    } else {
      fetchData()
      const interval = setInterval(() => {
        fetchData() // Gọi lại API mỗi phút
      }, 1000 * 60 * 10)
      return () => clearInterval(interval)
    }
  }, [])

  return <></>
}
