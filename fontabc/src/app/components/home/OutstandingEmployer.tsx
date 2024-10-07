import React from 'react'
import CountNumbers from './CountNumbers'
import CountTime from './CountTime'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { GrFormNextLink } from 'react-icons/gr'
export default function OutstandingEmployer() {
  return (
    <section
      className='h-[470px] mt-24 px-48 flex relative'
      style={{
        backgroundImage: "url('/images/cover.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Image
        src={'/images/flash-badge-intro.webp'}
        width={322}
        height={280}
        className='absolute -rotate-[16.5deg] drop-shadow-custom ml-[58rem] -mt-[3rem]'
        alt='vuducbo'
      />
      <div className='flex flex-col pt-14 w-[550px]'>
        <span className='font-bold text-5xl text-white'>Huy Hiệu Tia Sét</span>
        <span className='font-semibold text-white py-4 text-sm'>
          Ghi nhận sự tương tác thường xuyên của Nhà tuyển dụng với CV ứng viên
        </span>
        <div className='bg-custom-gradient-outstanding flex h-[46px] rounded-xl'>
          <span className='font-semibold text-2xl text-white flex justify-center items-center ml-4'>
            <CountNumbers number={1845} />
          </span>
          <span className='flex justify-center items-center font-semibold text-white py-4 text-sm ml-2'>
            tin đăng được NTD tương tác thường xuyên trong 24 giờ qua
          </span>
        </div>
        <span className='font-semibold text-base text-white tracking-[4px] my-7'>TỰ ĐỘNG CẬP NHẬT SAU</span>
        <CountTime />
      </div>
      <div className='pt-14 flex flex-col gap-3'>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className='flex gap-3 w-[290px] ml-6 bg-white rounded-lg h-[86px] pt-3 relative'>
            <Image
              src={'/images/icon-flash.webp'}
              width={21}
              height={29}
              alt='vuducbo'
              className='absolute -top-[4px] left-[6px]'
            />
            <div className=' ml-3'>
              <Image
                src={
                  '/images/cong-ty-co-phan-xuat-nhap-khau-hoa-dau-mien-nam-b8f20e974100c3e7e03389bcf554d9f7-66a37de0827f2.webp'
                }
                width={56}
                height={56}
                alt='vuducbo'
                className='rounded border bg-custom-gradient-outstanding-employer p-[2px]'
              />
            </div>
            <div className='flex flex-col w-2/3'>
              <span className='line-clamp-2 font-semibold text-xs'>
                Chuyên Viên Content Tiktok / Content Marketing Viral 2 Năm Kinh Nghiệm - Thu Nhập Upto 15 Triệu/Tháng
                Tại Hà Nội
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
        <div className='w-[290px] mt-72 pl-24'>
          <span className='font-bold text-xl text-white w-[220px]'>Danh sách tin đăng đạt Huy hiệu Tia sét</span>
          <Button variant='topcv' className='ml-8 mt-5'>
            Xem ngay <GrFormNextLink color='white' fontSize='1.7em' />
          </Button>
        </div>
      </div>
    </section>
  )
}
