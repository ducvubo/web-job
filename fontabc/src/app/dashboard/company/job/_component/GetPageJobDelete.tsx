'use client'
import { genSignEndPoint } from '@/app/utils'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useSearchParams } from 'next/navigation'
import { DataTablePagination } from '@/app/components/admin/DataTablePagination'
import { ResSuccess } from '../job.interface'
import { DataTable } from './DataTable'
import { columns } from './ColumnTable'
import { getJobPagination } from '../api'
import { useLoading } from '@/context/LoadingContext'

const AllJobWithCompany = async ({
  current,
  pageSize,
  type
}: {
  current?: number
  pageSize?: number
  type: 'delete' | 'all'
}) => {
  const res: IBackendRes<any> = await getJobPagination(current as number, pageSize as number, 'delete')
  if (res && res.statusCode === 200) {
    return {
      data: res.metaData.result,
      meta: res.metaData.meta
    }
  } else {
    toast.error('Đã có lỗi xảy ra vui lòng thử lại1')
  }
}

export default function GetPageJobDelete() {
  const { setLoading } = useLoading()
  const searchParams = useSearchParams()
  const [data, setData] = useState<any[]>([])
  const [current, setCurrent] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(8)
  const [pages, setPages] = useState<number>(0)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async (current: number, pageSize: number) => {
    setLoading(true)
    setIsLoading(true)
    const allJobWithCompany = await AllJobWithCompany({ current, pageSize, type: 'delete' })
    if (allJobWithCompany) {
      setLoading(false)
      setIsLoading(false)
      setData(allJobWithCompany.data)
      setPages(allJobWithCompany.meta.pages)
      setTotalItems(allJobWithCompany.meta.totalItems)
    }
  }

  useEffect(() => {
    fetchData(current + 1, pageSize)
  }, [current, pageSize, searchParams])
  return (
    <>
      <DataTable columns={columns} data={data} isLoading={isLoading} />
      <DataTablePagination
        current={current}
        pages={pages}
        setCurrent={setCurrent}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </>
  )
}
