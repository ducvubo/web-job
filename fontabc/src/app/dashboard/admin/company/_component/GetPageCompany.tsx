'use client'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { genSignEndPoint } from '@/app/utils'
import { useSearchParams } from 'next/navigation'
import { Res } from '../Company.interface'
import { DataTablePagination } from '@/app/components/admin/DataTablePagination'
import { DataTable } from './DataTable'
import { columns } from './ColumnTable'

const AllCompany = async ({ current, pageSize }: { current?: number; pageSize?: number }) => {
  const { sign, stime, version, nonce } = genSignEndPoint()
  const res: Res = await (
    await fetch(`/api/admin/companies?current=${current}&pageSize=${pageSize}`, {
      cache: 'no-store',
      method: 'GET',
      headers: {
        sign,
        stime,
        version,
        nonce
      }
    })
  ).json()
  if (res.statusCode === 200) {
    return {
      data: res.metaData.result,
      meta: res.metaData.meta
    }
  } else {
    toast.error('Đã có lỗi xảy ra vui lòng thử lại')
  }
}

export default function GetPageCompany() {
  const searchParams = useSearchParams()
  const [data, setData] = useState<any[]>([])
  const [current, setCurrent] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)
  const [pages, setPages] = useState<number>(0)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async (current: number, pageSize: number) => {
    setIsLoading(true)
    const allCompany = await AllCompany({ current, pageSize })
    if (allCompany) {
      setIsLoading(false)
      setData(allCompany.data)
      setPages(allCompany.meta.pages)
      setTotalItems(allCompany.meta.totalItems)
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
