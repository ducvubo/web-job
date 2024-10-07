import React from 'react'
import RotatingText from './RotatingText'
import { IoLocationOutline, IoSearchOutline } from 'react-icons/io5'
import { InputBanner } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Chart } from './BarChart'
import { FaArrowTrendUp } from 'react-icons/fa6'
import SelectAddress from './Select_address'
import CountNumbers from './CountNumbers'

export default function Banner() {
  const options: any = { day: '2-digit', month: '2-digit', year: 'numeric' }
  const date = new Date().toLocaleDateString('vi-VN', options)
  return (
    <section
      className='h-[432px] flex justify-center items-center gap-5'
      style={{
        backgroundImage: "url('/images/bg_header.webp')",
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className=' w-1/2 flex flex-col gap-4 justify-center pl-48'>
        <span className='text-base font-semibold text-gray-300'>Công nghệ AI dự đoán, cá nhân hoá việc làm</span>
        <div className='flex'>
          <RotatingText />
          <span className='ml-2 text-3xl font-bold text-gray-300'> dành cho bạn.</span>
        </div>
        <div className='bg-white w-[542px] h-[56px] rounded-xl flex'>
          <div className='w-2/5 flex justify-center items-center ml-3'>
            <IoSearchOutline fontSize='1.5em' opacity='0.7' />
            <InputBanner placeholder='Vị trí ứng tuyển' />
          </div>
          <div className='border-l-[2px] border-[#e9eaec] h-3/5 w-1 mt-2'></div>
          <div className='w-2/5 flex justify-center items-center'>
            <IoLocationOutline fontSize='1.5em' opacity='0.7' />
            <SelectAddress />
          </div>
          <div className='w-1/5 m-auto'>
            <Button variant='topcv'>Tìm kiếm</Button>
          </div>
        </div>
        <Image
          className='border-solid border-[1px] rounded-xl border-green-300'
          src={'/images/banner.webp'}
          alt='Banner'
          width={540}
          height={197}
        />
      </div>
      <div className=' w-1/2 h-[366px] rounded-2xl  bg-[#196247] mr-48 border border-[#196247] hover:border hover:border-green-500 hover:shadow-custom'>
        <div className='flex mt-2 ml-4'>
          <Image src={'/images/work_market_star.webp'} width={24} height={24} alt='vuducbo' />
          <span className='ml-2 font-semibold text-sm text-white'>Thị trường việc làm hôm nay:</span>
          <span className='ml-52 font-semibold text-sm text-white'>{date}</span>
        </div>
        <div className='flex'>
          <div className='flex gap-3 ml-6 mt-5 mr-4'>
            <span className='font-semibold text-sm text-white'>Việc làm đang tuyển</span>{' '}
            <span className='font-semibold text-sm  text-[#11d769]'>
              <CountNumbers number={56695} />
            </span>{' '}
            <FaArrowTrendUp color='#11d769' fontSize='1.1em' />
          </div>
          <div className='mt-2 self-center bg-custom-gradient h-[2px] opacity-60 -right-[34px] rotate-90 w-[34px]'></div>
          <div className='flex gap-3 ml-6 mt-5'>
            <span className='font-semibold text-sm text-white'>Việc làm mới hôm nay</span>{' '}
            <span className='font-semibold text-sm  text-[#11d769]'><CountNumbers number={51670} /></span>{' '}
          </div>
        </div>
        <div className='self-center bg-custom-gradient h-[2px] opacity-60 -right-[34px]  w-[530px] mx-auto mt-5'></div>
        <Chart />
      </div>
    </section>
  )
}
