import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (
    <section className='h-[605px] '>
      <div className='flex gap-20 mx-48 mt-10'>
        <div className='flex flex-col gap-5'>
          <Image src={'/images/topcv-logo-footer-6.webp'} width={327} height={128} alt='vuducbo' />
          <div className='flex'>
            <Image src={'/images/google_for_startup.webp'} width={145} height={39} alt='vuducbo' />
            <Image src={'/images/DMCA_badge_grn_60w.png'} width={40} height={39} alt='vuducbo' />
            <Image src={'/images/bct.webp'} width={95} height={36} alt='vuducbo' />
          </div>
          <span className='font-semibold text-base'>Liên hệ</span>
          <div>
            <div className='text-[#6f7882] text-sm cursor-pointer flex'>
              Hotline: <p className='font-semibold text-base text-black'>(024) 6680 5588 (Giờ hành chính)</p>
            </div>
            <div className='text-[#6f7882] text-sm cursor-pointer flex'>
              Email: <p className='font-semibold text-base text-black'>hotro@topcv.vn</p>
            </div>
          </div>
          <span className='font-semibold text-base'>Ứng dụng tải xuống</span>
          <div className='flex'>
            <Image src={'/images/appstore_black.webp'} width={150} height={45} alt='vuducbo' />
            <Image src={'/images/googleplay_black.webp'} width={150} height={45} alt='vuducbo' />
          </div>
          <span className='font-semibold text-base'>Cộng đồng TopCV</span>
          <div className='flex gap-5'>
            <Image src={'/images/facebook.webp'} width={32} height={32} alt='vuducbo' className='rounded-full' />
            <Image src={'/images/youtube.webp'} width={32} height={32} alt='vuducbo' className='rounded-full' />
            <Image src={'/images/linkedin.webp'} width={32} height={32} alt='vuducbo' className='rounded-full' />
            <Image src={'/images/tiktok.webp'} width={32} height={32} alt='vuducbo' className='rounded-full' />
          </div>
        </div>
        <div>
          <div className='flex flex-col gap-2'>
            <span className='font-semibold text-base mb-1'>Về TopCV</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Giới thiệu</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Góc báo chí</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Tuyển dụng</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Liên hệ</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Hỏi đáp</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Chính sách bảo mật</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Điều khoản dịch vụ</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Quy chế hoạt động</span>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='font-semibold text-base mb-1 mt-5'>Khám phá</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Ứng dụng di động TopCV</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Tính lương Gross - Net</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Tính lãi suất kép</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Lập kế hoạch tiết kiệm</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Tính bảo hiểm thất nghiệp</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Tính bảo hiểm xã hội một lần</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Trắc nghiệm MBTI</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Trắc nghiệm MI</span>
          </div>
        </div>
        <div>
          <div className='flex flex-col gap-2'>
            <span className='font-semibold text-base mb-1'>Về TopCV</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Giới thiệu</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Góc báo chí</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Tuyển dụng</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Liên hệ</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Hỏi đáp</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Chính sách bảo mật</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Điều khoản dịch vụ</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Quy chế hoạt động</span>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='font-semibold text-base mb-1 mt-5'>Khám phá</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Ứng dụng di động TopCV</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Tính lương Gross - Net</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Tính lãi suất kép</span>
          </div>
        </div>
        <div>
          <div className='flex flex-col gap-2'>
            <span className='font-semibold text-base mb-1'>Về TopCV</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Giới thiệu</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Góc báo chí</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Tuyển dụng</span>

            <span className='text-[#6f7882] text-sm cursor-pointer'>Chính sách bảo mật</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Điều khoản dịch vụ</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Quy chế hoạt động</span>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='font-semibold text-base mb-1 mt-5'>Khám phá</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Ứng dụng di động TopCV</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Tính lương Gross - Net</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Tính lãi suất kép</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Lập kế hoạch tiết kiệm</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Tính bảo hiểm thất nghiệp</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Tính bảo hiểm xã hội một lần</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Trắc nghiệm MBTI</span>
            <span className='text-[#6f7882] text-sm cursor-pointer'>Trắc nghiệm MI</span>
          </div>
        </div>
      </div>
      <div className='border mt-10'></div>
      <span className='flex justify-center items-center mt-2'>
        Hề Lô Các Bạn Mình Là Vũ Đức Bo Bo Bo Bo Bo Bo Bo Bo Bo Bo Bo Bo!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      </span>
    </section>
  )
}
