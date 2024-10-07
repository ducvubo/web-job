'use client'
import { genSignEndPoint } from '@/app/utils'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function DeleteCompany({ company }: any) {
  const router = useRouter()
  const deleteCompany = async () => {
    const { nonce, sign, stime, version } = genSignEndPoint()
    try {
      const res = await (
        await fetch(`${process.env.NEXT_PUBLIC_HOST_FRONTEND}/api/admin/companies/${company.company_slug}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            sign,
            stime,
            version,
            nonce
          }
        })
      ).json()
      if (res.statusCode === 200) {
        toast.success('Công ty đã được chuyển vào thùng rác')
        router.push(`/dashboard/admin/company?a=${Math.random()}`)
      } else {
        toast.error('Có lỗi xảy ra vui lòng thử lại')
      }
    } catch (error) {
      console.log('error', error)
      toast.error('Có lỗi xảy ra vui lòng thử lại')
    }
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <span className='text-sm ml-[9px] mb-1 cursor-pointer'>Xóa</span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có muốn xóa công ty không???</AlertDialogTitle>
            <AlertDialogDescription>
              Công ty &rdquo;{company.company_name}&rdquo; sẽ bị chuyển vào thùng giác!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction className='topcv' onClick={deleteCompany}>
              Tiếp tục
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
