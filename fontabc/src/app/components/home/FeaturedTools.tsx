import Image from 'next/image'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { GrFormNextLink } from 'react-icons/gr'

export default function FeaturedTools() {
  return (
    <section className='h-[540px] bg-[#f3f5f7]'>
      <span className='font-semibold text-4xl text-[#00b14f] flex justify-center items-center pt-10'>
        Công cụ vượt trội!
      </span>
      <div className='flex justify-center items-center gap-10 mt-5'>
        <div className='flex flex-col gap-10 '>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className='flex gap-3 w-[350px] ml-6 bg-white rounded-lg h-[80px] pt-3 hover:bg-[#f3f5f7] hover:border hover:border-[#00b14f] border cursor-pointer'
            >
              <div className=' ml-3 '>
                <Image
                  src={'/images/thu-nhap-ca-nhan.webp'}
                  width={58}
                  height={58}
                  alt='vuducbo'
                  className='rounded-full border'
                />
              </div>
              <div className='flex flex-col w-2/3'>
                <span className='line-clamp-2 font-semibold text-base mt-1'>Tính lương GROOS - NET</span>
                <span className='line-clamp-1  text-xs text-[#00b14f] flex mt-1'>
                  Khám phá ngay <GrFormNextLink color='#00b14f' fontSize='1.5em' />
                </span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Image src={'/images/superior-tool-bg.webp'} width={357} height={500} alt='vuducbo' />
        </div>
        <div className='flex flex-col gap-10 '>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className='flex gap-3 w-[350px] ml-6 bg-white rounded-lg h-[80px] pt-3 hover:bg-[#f3f5f7] hover:border hover:border-[#00b14f] border cursor-pointer'
            >
              <div className=' ml-3 '>
                <Image
                  src={'/images/thu-nhap-ca-nhan.webp'}
                  width={58}
                  height={58}
                  alt='vuducbo'
                  className='rounded-full border'
                />
              </div>
              <div className='flex flex-col w-2/3'>
                <span className='line-clamp-2 font-semibold text-base mt-1'>Tính lương GROOS - NET</span>
                <span className='line-clamp-1  text-xs text-[#00b14f] flex mt-1'>
                  Khám phá ngay <GrFormNextLink color='#00b14f' fontSize='1.5em' />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
