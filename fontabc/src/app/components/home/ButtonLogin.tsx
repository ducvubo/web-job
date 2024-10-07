'use client'
import { RootState } from '@/app/redux/store'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function ButtonLogin() {
  const [isShow, setIsShow] = useState(false)
  const inforUser = useSelector((state: RootState) => state.inforUser)
  const inforCompany = useSelector((state: RootState) => state.inforCompany)

  useEffect(() => {
    const isInfor = Boolean(inforUser?.email) || Boolean(inforCompany?.company_email)
    if (isInfor) {
      setIsShow(false)
    } else {
      setIsShow(true)
    }
  }, [inforUser, inforCompany])

  return (
    <>
      {!isShow ? (
        <Button className='w-[104px] opacity-0'></Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>Đăng nhập</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-44'>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={'/auth/company/login'}>Bạn là nhà tuyển dụng</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href={`${process.env.NEXT_PUBLIC_HOST_SSO}/auth/login?apikey=${process.env.NEXT_PUBLIC_API_KEY_SSO}&serviceUrl=${process.env.NEXT_PUBLIC_HOST_FRONTEND}`}
                >
                  Bạn là ứng viên
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}
