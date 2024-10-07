import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SelectAddress from './Select_address'
import { AiOutlineBars } from 'react-icons/ai'
import { CarouselFilter } from './CarouselFillter'
import { CarouselJob } from './CarouselJob'
export default function JobBest() {
  return (
    <section className='h-[650px] pt-6 px-48 bg-[#f3f5f7]'>
      <div className='flex mb-5'>
        <span className='text-2xl font-bold text-[#00b14f]'>Việc làm tốt nhất</span>
        <div className='border h-[35px] w-[1px] mx-5'></div>
        <Image src={'/images/label-toppy-ai.webp'} width={110} height={26} alt='vuducbo' />
        <Link href={'#'} className='underline ml-[680px]'>
          Xem tất cả
        </Link>
      </div>
      <div className='flex gap-44'>
        <div className='border border-[#ccc] flex rounded-md p-1'>
          <div className='mt-[7px] flex gap-1'>
            <AiOutlineBars fontSize='1.5em' opacity='0.7' />
            <span>Lọc theo: </span>
          </div>
          <SelectAddress />
        </div>
        <CarouselFilter />
      </div>
      <div className='mt-5'>
        <CarouselJob />
      </div>
    </section>
  )
}
