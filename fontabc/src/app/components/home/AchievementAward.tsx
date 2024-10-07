import React from 'react'
import Image from 'next/image'
import { GrFormNextLink } from 'react-icons/gr'

export default function AchievementAward() {
  return (
    <section className='h-[630px] bg-[#16353a] mt-16 mx-48 rounded-xl w-[1135px] flex'>
      <Image
        src={'/images/award_cover_bottom.webp'}
        width={571}
        height={542}
        alt='vuducbo'
        className=' rounded-xl absolute right-[194px] top-[4590px]'
      />
      <div className='relative'>
      </div>
      <div>
        <div className='pt-16 pl-10 pb-6 '>
          <span className='font-semibold text-4xl text-white'>Giải thưởng, thành tựu</span>
        </div>
        <div className='pl-10 gap-4 grid grid-cols-2 w-full pr-[465px] '>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className='z-[1] flex gap-3 w-[310px] bg-[#0e9249] rounded-lg h-[138px] pt-3 hover:bg-[#00b14f] hover:border hover:border-[#00b14f] border border-[#0e9249] cursor-pointer'
            >
              <div className='ml-3 mt-4'>
                <Image src={'/images/award_03.webp'} width={77} height={77} alt='vuducbo' className='rounded-lg' />
              </div>
              <div className='flex flex-col gap-2 w-2/3 mt-4'>
                <span className='line-clamp-2 font-semibold text-sm mt-1 text-white'>
                  Sản phẩm công nghệ số Make in Viet Nam 2022
                </span>
                <span className='line-clamp-1  text-xs text-white flex mt-1 font-semibold'>
                  Khám phá ngay <GrFormNextLink color='white' fontSize='1.5em' fontWeight={600} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
