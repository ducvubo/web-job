'use client'
import { CompanyDescription } from '@/app/dashboard/admin/company/Company.interface'
import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6'
import DOMPurify from 'dompurify'

export default function DescriptionCongTy({ company_description }: { company_description: CompanyDescription }) {
  const [isStatus, setIsStatus] = useState<boolean>(false)
  const sanitizedHtml = DOMPurify.sanitize(company_description.html)
  return (
    <div className={`${isStatus ? 'h-auto ' : 'h-[282px]'} w-[750px] px-6  pt-5 bg-white rounded-b-lg relative`}>
      <div
        className={
          !isStatus
            ? `h-4/5 overflow-hidden text-[#4d5965] text-sm font-normal`
            : `h-auto text-[#4d5965 text-sm font-normal]`
        }
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      ></div>
      <div className={!isStatus ? `h-5` : `h-16`}>
        {isStatus ? (
          ''
        ) : (
          <div className='bg-custom-gradient-desctiption-congty h-11 w-[720px] bottom-[44px] absolute'></div>
        )}

        <span
          className={
            !isStatus
              ? 'px-6 cursor-pointer text-[#00b14f] absolute left-0 top-60 text-sm flex'
              : 'px-6 cursor-pointer text-[#00b14f]  text-sm flex items-center pt-5 pl-0'
          }
          onClick={() => setIsStatus(!isStatus)}
        >
          {isStatus ? 'Thu gọn' : 'Xem thêm'}{' '}
          {isStatus ? <FaAngleUp className='mt-1 ml-2' /> : <FaAngleDown className='mt-1 ml-2' />}
        </span>
      </div>
    </div>
  )
}
