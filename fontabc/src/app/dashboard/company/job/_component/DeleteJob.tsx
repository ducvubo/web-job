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
import { deleteJob } from '../api'
import { useLoading } from '@/context/LoadingContext'

export default function DeleteJob({ job }: any) {
  const { setLoading } = useLoading()
  const router = useRouter()
  const deleteProduct = async () => {
    setLoading(true)
    // const { nonce, sign, stime, version } = genSignEndPoint()
    //   const res = await (
    //     await fetch(`${process.env.NEXT_PUBLIC_HOST_FRONTEND}/api/admin/companies/${job._id}`, {
    //       method: 'DELETE',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         sign,
    //         stime,
    //         version,
    //         nonce
    //       }
    //     })
    //   ).json()

    try {
      const res = await deleteJob(job.job_slug)
      if (res.statusCode === 200) {
        setLoading(false)
        toast.success('Công ty đã được chuyển vào thùng rác')
        // router.push(`/admin/company?a=${Math.random()}`)
        router.push(`/dashboard/company/job?a=${Math.random()}`)
        router.refresh()
      } else {
        setLoading(false)
        toast.error('Có lỗi xảy ra vui lòng thử lại')
      }
    } catch (error) {
      setLoading(false)
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
            <AlertDialogTitle>Bạn có muốn xóa jobkhông???</AlertDialogTitle>
            <AlertDialogDescription>
              Job &rdquo;{job.job_name}&rdquo; sẽ bị chuyển vào thùng giác!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction className='topcv' onClick={deleteProduct}>
              Tiếp tục
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
