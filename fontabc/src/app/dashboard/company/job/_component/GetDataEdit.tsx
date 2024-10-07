'use client'
import { genSignEndPoint } from '@/app/utils'
import React, { useEffect, useState } from 'react'
import FormAddOrEditJob from './AddOrEditJob'
import { IJob } from '../job.interface'
import { useRouter } from 'next/navigation'
import { getDataEdit } from '../api'
import FormAddOrEditJobTest from './text'
import { useLoading } from '@/context/LoadingContext'

export default function GetDataEdit({ params }: any) {
  const { setLoading } = useLoading()
  const router = useRouter()
  const [inforJob, setInforJob] = useState()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const getInforJobWithCompany = async (id: string) => {
      setLoading(true)
      if (id === 'add') {
        setLoading(false)
        return
      }
      if (id === 'delete') {
        setLoading(false)

        return
      }
      const res = await getDataEdit(id)
      if (res.statusCode === 200) {
        setLoading(false)
        return res.metaData
      } else {
        setLoading(false)
        router.push('/dashboard/company/job')
        router.refresh()
      }
    }

    const fetchCompanyInfo = async () => {
      const inforJob = await getInforJobWithCompany(params.slug)
      if (inforJob) {
        setInforJob(inforJob)
        setIsLoaded(true)
      }
    }

    if (!isLoaded && params.slug !== 'add') {
      fetchCompanyInfo()
    }
  }, [params.slug, isLoaded])

  useEffect(() => {}, [inforJob])
  return <FormAddOrEditJob inforJob={inforJob} id={params.slug} />
}
