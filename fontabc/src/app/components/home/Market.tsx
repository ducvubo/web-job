import Image from 'next/image'
import React from 'react'
import { Chart } from './BarChartMarket'
import { LineChartMarket } from './LineChartMarket'
import CountNumbers from './CountNumbers'

export default function Market() {
  return (
    <section className='h-[540px] mt-20 mx-48 bg-custom-gradient-banner rounded-lg'>
      <header>
        <div className='relative'>
          <Image src={'/images/dashboard-bg-header.png'} width={1140} height={56} alt='vuducbo' />
          <div className='absolute top-2 flex ml-5 gap-2'>
            <span className='text-2xl font-bold text-gray-300'>Thị trường việc làm hôm nay</span>{' '}
            <span className='text-2xl font-bold text-[#11d359]'> 27/07/2024</span>
          </div>
        </div>
      </header>
      <div className='flex gap-5'>
        <div className='flex flex-col gap-4'>
          <Image src={'/images/dashboard-item.webp'} width={298} height={128} alt='vuducbo' className='ml-6 mt-4' />
          <span className='font-semibold text-white ml-6'>Việc làm mới nhất</span>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className='flex gap-3 w-[290px] ml-6'>
              <div className='mt-2'>
                <Image
                  src={
                    '/images/cong-ty-co-phan-xuat-nhap-khau-hoa-dau-mien-nam-b8f20e974100c3e7e03389bcf554d9f7-66a37de0827f2.webp'
                  }
                  width={66}
                  height={66}
                  alt='vuducbo'
                  className='rounded border-[white] border '
                />
              </div>
              <div className='flex flex-col '>
                <span className='line-clamp-2 font-semibold text-white text-sm'>
                  Nhân Viên Thu Mua - Purchasing Staff
                </span>
                <span className='line-clamp-1 font-semibold text-xs text-[#a6acb2]'>
                  Công Ty cổ phần xuất nhập khẩu hóa dầu miền Nam
                </span>
                <span className='line-clamp-1 font-semibold text-xs text-[#a6acb2]'>Hồ Chí Minh</span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className='flex gap-3 mt-7'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className='w-[250px] h-[80px] px-[16px] py-[14px] flex flex-col rounded-lg'
                style={{
                  backgroundImage: "url('/images/bg-statistics-job-item.png')",
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <span className='font-semibold text-white text-3xl'>
                  <CountNumbers number={2081} />
                </span>
                <span className='font-semibold text-white text-xs'>Việc làm mới 24h gần nhất</span>
              </div>
            ))}
          </div>
          <div className='flex h-[315px] gap-3 mr-[27px] mt-5'>
            <div
              className='w-1/2 rounded-lg'
              style={{
                backgroundImage: "url('/images/bg-statistics-job-item.png')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <LineChartMarket />
            </div>
            <div
              className='w-1/2 rounded-lg'
              style={{
                backgroundImage: "url('/images/bg-statistics-job-item.png')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <Chart />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
