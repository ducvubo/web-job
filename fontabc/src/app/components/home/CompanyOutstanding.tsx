'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carsousel.custom'
import Image from 'next/image'
export default function CompanyOutstanding() {
  return (
    <section className='px-48 pt-6'>
      <span className='text-2xl font-bold text-[#00b14f]'>Top Công ty hàng đầu</span>
      <div className='mt-5'>
        <Carousel
          opts={{
            align: 'start'
          }}
          className='w-full max-w-[1160px]'
        >
          <CarouselContent>
            {Array.from({ length: 20 }).map((_, index) => (
              <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/4'>
                <div className='p-1 border-[#ccc] rounded-2xl border w-[268px] h-[206px] flex justify-center items-center flex-col gap-5 hover:border-[#00b14f] hover:shadow-lg hover:shadow-cyan-500/50'>
                  <Image
                    src={'/images/cong-ty-tai-chinh-co-phan-tin-viet-5bd6b78cc1e7e_rs.jpg'}
                    width={96}
                    height={96}
                    alt='vuducbo'
                  />
                  <span className='uppercase font-semibold text-sm px-3 text-center'>
                    Công Ty Tài Chính Cổ Phần Tín Việt
                  </span>
                  <div>
                    <div className='bg-[#f3f5f7] inline-block px-2 rounded-sm mr-2'>
                      <span className='text-xs'>Thiết kế</span>
                    </div>
                    <div className='bg-[#f3f5f7] inline-block px-2 rounded-sm mr-2'>
                      <span className='text-xs'>React</span>
                    </div>
                    <div className='bg-[#f3f5f7] inline-block px-2 rounded-sm mr-2'>
                      <span className='text-xs'>Design</span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='absolute top-[231px] left-[515px]' />
          <CarouselNext className='absolute top-[231px] right-[515px]' />
        </Carousel>
      </div>
    </section>
  )
}
