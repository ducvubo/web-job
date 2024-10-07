'use client'
import * as React from 'react'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'

export function CarouseCareer() {
  const handleNext = () => {
    console.log('next')
  }
  return (
    <Carousel className='w-full max-w-max '>
      <CarouselContent className='grid grid-cols-4 grid-rows-2 !ml-0 gap-10 mr-10 mt-8'>
        {Array.from({ length: 8 }).map((_, index) => (
          <CarouselItem key={index} className='!px-0 -mt-7'>
            <div className='px-1 gap-2 flex flex-col justify-center items-center border rounded-lg bg-[#f3f5f7] hover:border hover:border-[#33c172] w-[270px] h-[231px] hover:bg-white hover:shadow-custom-career'>
              <Image src={'/images/cong-nghe-thong-tin.webp'} width={100} height={100} alt='vuducbo' />
              <span className='font-semibold'>Quản lý chất lượng (QA/QC)</span>
              <span className='text-[#00b14f]'>867 việc làm</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='top-[510px] left-[450px]' />
      <span className='absolute left-[513px] top-[498px]'>4 / 44 trang</span>
      <CarouselNext className='top-[510px] right-[470px] border-[#00b14f]' onClick={handleNext} />
    </Carousel>
  )
}
