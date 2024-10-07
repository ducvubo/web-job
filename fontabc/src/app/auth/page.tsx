'use client'

import { useEffect } from 'react'
import { useLoading } from '@/context/LoadingContext'

export default function Oauth() {
  const { setLoading } = useLoading()

  useEffect(() => {
    // Khi component bắt đầu render, setLoading = true
    setLoading(true)

    // Hàm cleanup sẽ được gọi khi component bị unmount
    return () => {
      setLoading(false)
    }
  }, [setLoading])

  return <></>
}
