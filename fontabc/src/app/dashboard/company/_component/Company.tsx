'use client'
import { RootState } from '@/app/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Company() {
  const inforCompany = useSelector((state: RootState) => state.inforCompany)
    ? useSelector((state: RootState) => state.inforCompany)
    : null
  return <div>Company</div>
}
