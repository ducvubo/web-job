import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GrFormNextLink } from 'react-icons/gr'
import Image from 'next/image'
export default function TrademarkSelf() {
  return (
    <section className='mx-48 mt-10 h-[590px]'>
      <span className='font-bold text-2xl text-[#00b14f]'>Top ngành nghề nổi bật</span>
      <div className='flex gap-3 mt-5 mb-5'>
        {Array.from({ length: 2 }).map((_, index) => (
          <Card key={index} className=' group hover:border hover:border-[#00b14f] h-[216px] bg-[#f1faf6]'>
            <CardHeader>
              <CardTitle className='group-hover:text-[#00b14f] text-lg'>TopCV Profile</CardTitle>
            </CardHeader>
            <CardContent className='flex !p-0'>
              <span className='text-[#a6acb2] !ml-5 text-sm'>
                TopCV Profile là bản hồ sơ năng lực giúp bạn xây dựng thương hiệu cá nhân, thể hiện thế mạnh của bản
                thân thông qua việc đính kèm học vấn, kinh nghiệm, dự án, kỹ năng,... của mình
              </span>
              <Image
                src={'/images/profile-desktop.webp'}
                width={146}
                height={216}
                alt='vuducbo'
                className='w-[131px] h-[200px] -mt-[65px]'
              />
            </CardContent>
            <CardFooter>
              <Button variant='topcv' className='font-normal -mt-10 h-8 mr-1'>
                Tạo Profile
                <GrFormNextLink color='white' fontSize='1.5em' />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <span className='font-bold text-2xl text-[#00b14f]'>Thấu hiểu bản thân - Nâng tầm giá trị</span>
      <div className='flex gap-3 mt-5'>
        {Array.from({ length: 2 }).map((_, index) => (
          <Card key={index} className=' group hover:border hover:border-[#00b14f] h-[216px] bg-[#f1faf6]'>
            <CardHeader>
              <CardTitle className='group-hover:text-[#00b14f] text-lg'>TopCV Profile</CardTitle>
            </CardHeader>
            <CardContent className='flex !p-0'>
              <span className='text-[#a6acb2] !ml-5 text-sm'>
                TopCV Profile là bản hồ sơ năng lực giúp bạn xây dựng thương hiệu cá nhân, thể hiện thế mạnh của bản
                thân thông qua việc đính kèm học vấn, kinh nghiệm, dự án, kỹ năng,... của mình
              </span>
              <Image
                src={'/images/profile-desktop.webp'}
                width={146}
                height={216}
                alt='vuducbo'
                className='w-[131px] h-[200px] -mt-[65px]'
              />
            </CardContent>
            <CardFooter>
              <Button variant='topcv' className='font-normal -mt-10 h-8 mr-1'>
                Tạo Profile
                <GrFormNextLink color='white' fontSize='1.5em' />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
