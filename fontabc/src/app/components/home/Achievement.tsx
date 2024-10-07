import React from 'react'
import CountNumbers from './CountNumbers'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
export default function Achievement() {
  return (
    <section
      className='h-[830px]'
      style={{
        backgroundImage: "url('/images/impressive_numbers_cover_new.webp')",
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className='flex justify-center items-center'>
        <span
          className='h-[5px] w-[246px] mt-12'
          style={{
            backgroundImage: "url('/images/decorated_title_green.webp')",
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat'
          }}
        ></span>
        <span className='font-semibold text-3xl text-[#00b14f] flex justify-center items-center pt-10 mx-6'>
          Con số ấn tượng
        </span>
        <div
          className='h-[5px] w-[246px] -scale-x-100 mt-[52px]'
          style={{
            backgroundImage: "url('/images/decorated_title_green.webp')",
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
      </div>
      <span className='text-white font-normal text-sm w-[1100px] flex justify-center items-center mx-auto text-center mt-3'>
        TopCV là công ty công nghệ nhân sự (HR Tech) hàng đầu Việt Nam. Với năng lực lõi là công nghệ, đặc biệt là trí
        tuệ nhân tạo (AI), sứ mệnh của TopCV đặt ra cho mình là thay đổi thị trường tuyển dụng - nhân sự ngày một hiệu
        quả hơn. Bằng công nghệ, chúng tôi tạo ra nền tảng cho phép người lao động tạo CV, phát triển được các kỹ năng
        cá nhân, xây dựng hình ảnh chuyên nghiệp trong mắt nhà tuyển dụng và tiếp cận với các cơ hội việc làm phù hợp.
      </span>
      <div>
        <div className='flex justify-center items-center gap-28 mt-10'>
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className='w-[510px] h-[166px] flex flex-col justify-center gap-1 px-16'
              style={{
                backgroundImage: "url('/images/impressive_numbers_list_item.webp')",
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <span className='flex font-bold text-3xl text-white'>
                <CountNumbers number={2000000} />+
              </span>
              <span className='font-bold text-base text-[#01d660]'>Việc làm đã được kết nối</span>
              <span className='text-white text-sm'>
                TopCV đồng hành và kết nối hàng nghìn ứng viên với những cơ hội việc làm hấp dẫn từ các doanh nghiệp uy
                tín.
              </span>
            </div>
          ))}
        </div>
        <div className='flex justify-center items-center mt-10'>
          <div
            className='w-[510px] h-[166px] flex flex-col justify-center gap-1 px-16'
            style={{
              backgroundImage: "url('/images/impressive_numbers_list_item.webp')",
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <span className='flex font-bold text-3xl text-white'>
              <CountNumbers number={2000000} />+
            </span>
            <span className='font-bold text-base text-[#01d660]'>Việc làm đã được kết nối</span>
            <span className='text-white text-sm'>
              TopCV đồng hành và kết nối hàng nghìn ứng viên với những cơ hội việc làm hấp dẫn từ các doanh nghiệp uy
              tín.
            </span>
          </div>
          <div>
            <Image src={'/images/topcv_processor_2x.webp'} width={324} height={150} alt='vuducbo' />
          </div>
          <div
            className='w-[510px] h-[166px] flex flex-col justify-center gap-1 px-16'
            style={{
              backgroundImage: "url('/images/impressive_numbers_list_item.webp')",
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <span className='flex font-bold text-3xl text-white'>
              <CountNumbers number={2000000} />+
            </span>
            <span className='font-bold text-base text-[#01d660]'>Việc làm đã được kết nối</span>
            <span className='text-white text-sm'>
              TopCV đồng hành và kết nối hàng nghìn ứng viên với những cơ hội việc làm hấp dẫn từ các doanh nghiệp uy
              tín.
            </span>
          </div>
        </div>
        <div className='flex justify-center items-center gap-28 mt-10'>
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className='w-[510px] h-[166px] flex flex-col justify-center gap-1 px-16'
              style={{
                backgroundImage: "url('/images/impressive_numbers_list_item.webp')",
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <span className='flex font-bold text-3xl text-white'>
                <CountNumbers number={2000000} />+
              </span>
              <span className='font-bold text-base text-[#01d660]'>Việc làm đã được kết nối</span>
              <span className='text-white text-sm'>
                TopCV đồng hành và kết nối hàng nghìn ứng viên với những cơ hội việc làm hấp dẫn từ các doanh nghiệp uy
                tín.
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* <Button className='mx-auto flex justify-center items-center w-[140px] h-[140px] rounded-full mt-20 border border-custom-color-hover bg-custom-color hover:bg-custom-color-hover hover:border hover:border-[#33c172]'>
        <Image src={'/images/icon-play.webp'} width={49} height={54} alt='vuducbo' />
      </Button>
      <span className='text-[#abffd0] font-semibold text-lg mx-auto flex mt-10 justify-center items-center'>
        Tiếp lợi thế, nối thành công
      </span>
      <div className='font-bold text-[30px] text-white w-[700px] mx-[450px] mt-20 text-center'>
        Hệ sinh thái công nghệ nhân sự của TopCV bao gồm 4 sản phẩm chủ lực:
      </div> */}
    </section>
  )
}
