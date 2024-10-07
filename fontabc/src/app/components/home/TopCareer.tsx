import Link from 'next/link'
import React from 'react'
import { CarouseCareer } from './CarouseCareer'

export default function TopCareer() {
  return (
    <section className='h-[600px] mt-10 mx-48'>
      <div className='flex flex-col'>
        <span className='font-bold text-2xl text-[#00b14f]'>Top ngành nghề nổi bật</span>
        <span className='text-sm'>
          Bạn muốn tìm việc mới? Xem danh sách việc làm
          <Link href='/' className='ml-1 text-[#00b14f] underline  underline-offset-1'>
            tại đây
          </Link>
        </span>
      </div>
      <div className='mt-5'>
        <CarouseCareer />
      </div>
    </section>
  )
}
