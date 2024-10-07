import Image from 'next/image'
import React from 'react'

export default function DownloadApp() {
  return (
    <div className='mx-48 h-[600px] flex gap-14 mt-20'>
      <div className='w-[585px] h-[600px]'>
        <Image
          src={'/images/build_career.webp'}
          width={585}
          height={600}
          alt='vuducbo'
          className='w-[585px] h-[600px]'
        />
      </div>
      <div className='flex flex-col mt-20'>
        <span className='font-bold text-2xl text-[#00b14f]'>Kiến tạo sự nghiệp của riêng bạn với ứng dụng TopCV</span>
        <span className='font-bold text-2xl mt-6'>“Tất cả trong một”</span>
        <span className='font-semibold mt-6'>
          Trải nghiệm tạo CV, tìm việc, ứng tuyển và hơn thế nữa - chỉ với một ứng dụng duy nhất. Bắt đầu ngay hôm nay!
        </span>
        <span className='font-bold text-2xl mt-16'>Tải ứng dụng ngay</span>
        <div className='flex gap-5 mt-10'>
          <div>
            <Image src={'/images/qrcode_black.webp'} width={128} height={128} alt='vuducbo' />
          </div>
          <div className='flex flex-col gap-5'>
            <Image src={'/images/appstore_black.webp'} width={182} height={52} alt='vuducbo' />
            <Image src={'/images/googleplay_black.webp'} width={182} height={52} alt='vuducbo' />
          </div>
        </div>
      </div>
    </div>
  )
}
