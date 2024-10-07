import * as React from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
export function CarouselFilter() {
  return (
    <Carousel
      opts={{
        align: 'start'
      }}
      className='w-full max-w-[600px] '
    >
      <CarouselContent className='mt-1'>
        <CarouselItem className=' lg:basis-1/5 '>
          <div className='p-1 flex justify-center items-center bg-[#e9eaec] h-10 rounded-3xl hover:border-[#00b14f] hover:border cursor-pointer'>
            <span className=''>Ngẫu nhiên</span>
          </div>
        </CarouselItem>
        <CarouselItem className=' lg:basis-1/5'>
          <div className='p-1 flex justify-center items-center bg-[#e9eaec] h-10 rounded-3xl hover:border-[#00b14f] hover:border cursor-pointer'>
            <span className=''>Hà Nội</span>
          </div>
        </CarouselItem>
        <CarouselItem className=' lg:basis-1/5 '>
          <div className='p-1 rounded-3xl bg-[#00b14f] h-10 flex justify-center items-center '>
            <span className='  text-white'>Hồ Chí Minh</span>
          </div>
        </CarouselItem>
        <CarouselItem className=' lg:basis-1/5'>
          <div className='p-1 flex justify-center items-center bg-[#e9eaec] h-10 rounded-3xl hover:border-[#00b14f] hover:border cursor-pointer'>
            <span className=''>Miền Nam</span>
          </div>
        </CarouselItem>
        <CarouselItem className=' lg:basis-1/5'>
          <div className='p-1 flex justify-center items-center bg-[#e9eaec] h-10 rounded-3xl hover:border-[#00b14f] hover:border cursor-pointer'>
            <span className=''>Miền Bắc</span>
          </div>
        </CarouselItem>
        <CarouselItem className=' lg:basis-1/5'>
          <div className='p-1 flex justify-center items-center bg-[#e9eaec] h-10 rounded-3xl hover:border-[#00b14f] hover:border cursor-pointer'>
            <span className=''>Thái Nguyên</span>
          </div>
        </CarouselItem>
        <CarouselItem className=' lg:basis-1/5'>
          <div className='p-1 flex justify-center items-center bg-[#e9eaec] h-10 rounded-3xl hover:border-[#00b14f] hover:border cursor-pointer'>
            <span className=''>Bắc Giang</span>
          </div>
        </CarouselItem>
        <CarouselItem className=' lg:basis-1/5'>
          <div className='p-1 flex justify-center items-center bg-[#e9eaec] h-10 rounded-3xl hover:border-[#00b14f] hover:border cursor-pointer'>
            <span className=''>Nghệ An</span>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
