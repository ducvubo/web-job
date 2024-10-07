'use client'
import * as React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'
import { FaRegHeart } from 'react-icons/fa'
import { toast } from 'sonner'
import { getJobPagination } from '@/app/dashboard/company/job/api'
import { useLoading } from '@/context/LoadingContext'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getJobHomePage } from '@/app/actions/home'

const AllJobHome = async ({ current, pageSize }: { current?: number; pageSize?: number }) => {
  const res: IBackendRes<any> = await getJobHomePage(current as number, pageSize as number)
  if (res && res.statusCode === 200) {
    return {
      data: res.metaData.result,
      meta: res.metaData.meta
    }
  } else {
    toast.error('Đã có lỗi xảy ra vui lòng thử lại1')
  }
}

export function CarouselJob() {
  const { setLoading } = useLoading()
  const searchParams = useSearchParams()
  const [data, setData] = useState<any[]>([])
  const [current, setCurrent] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(8)
  const [pages, setPages] = useState<number>(0)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async (current: number, pageSize: number) => {
    setLoading(true)
    setIsLoading(true)
    const allJobHome = await AllJobHome({ current, pageSize })
    if (allJobHome) {
      setLoading(false)
      setIsLoading(false)
      setData(allJobHome.data)
      setPages(allJobHome.meta.pages)
      setTotalItems(allJobHome.meta.totalItems)
    }
  }

  useEffect(() => {
    fetchData(current + 1, pageSize)
  }, [current, pageSize, searchParams])

  const handleNext = () => {
    console.log('next')
  }
  console.log(data)
  return (
    <Carousel className='w-full max-w-max '>
      <CarouselContent className='grid grid-cols-3 grid-rows-4'>
        {Array.from({ length: 12 }).map((_, index) => (
          <CarouselItem key={index} className='!px-0 ml-4 mb-4'>
            <div className=' flex border rounded-lg hover:bg-[#f3f5f7] hover:border hover:border-[#ccc] w-[362px] h-[94px] pl-2 bg-white'>
              <Image
                src={'/images/company-fpt.webp'}
                width={120}
                height={120}
                alt='vuducbo'
                className='w-[70px] h-[70px] object-fill my-auto'
              />
              <div className='ml-2 mt-3 mr-2'>
                <span className='line-clamp-1 font-semibold text-sm mb-1'>
                  Nhân Viên Kinh Doanh - Sale Online Thu Nhập 20 - 65tr Từ 2 Năm Kinh Nghiệm (100% Data Nóng)
                </span>
                <span className='line-clamp-1 text-xs'>CÔNG TY TNHH PAPASAN VIỆT NAM</span>
                <div className='mt-1 flex relative'>
                  <div className='bg-[#f3f5f7] inline-block px-1 rounded-lg mr-2'>
                    <span className='text-xs'>15 - 30 triệu</span>
                  </div>
                  <div className='bg-[#f3f5f7] inline-block px-1 rounded-lg '>
                    <span className='text-xs'>Thừa Thiên Huế, Đà Nẵng</span>
                  </div>
                  <div className='absolute top-4 left-[250px]'>
                    <FaRegHeart opacity={0.4} />
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
        {/* <CarouselItem className='!px-0 ml-4 mb-4 relative'>
          <Image src={'/images/icon-flash.webp'} width={24} height={34} alt='vuducbo' className='absolute -top-3'/>
          <div className=' flex border  w-[362px] h-[94px] pl-2 bg-white'>
            <Image
              src={'/images/company-fpt.webp'}
              width={120}
              height={120}
              alt='vuducbo'
              className='w-[70px] h-[70px] object-fill my-auto'
            />
            <div className='ml-2 mt-3 mr-2'>
              <span className='line-clamp-1 font-semibold text-sm mb-1'>
                Nhân Viên Kinh Doanh - Sale Online Thu Nhập 20 - 65tr Từ 2 Năm Kinh Nghiệm (100% Data Nóng)
              </span>
              <span className='line-clamp-1 text-xs'>CÔNG TY TNHH PAPASAN VIỆT NAM</span>
              <div className='mt-1 flex relative'>
                <div className='bg-[#f3f5f7] inline-block px-1 rounded-lg mr-2'>
                  <span className='text-xs'>15 - 30 triệu</span>
                </div>
                <div className='bg-[#f3f5f7] inline-block px-1 rounded-lg '>
                  <span className='text-xs'>Thừa Thiên Huế, Đà Nẵng</span>
                </div>
                <div className='absolute top-4 left-[250px]'>
                  <FaRegHeart />
                </div>
              </div>
            </div>
          </div>
        </CarouselItem> */}
      </CarouselContent>
      <CarouselPrevious className='top-[460px] left-[450px]' />
      <span className='absolute left-[513px] top-[448px]'>4 / 44 trang</span>
      <CarouselNext className='top-[460px] right-[450px] border-[#00b14f]' onClick={handleNext} />
    </Carousel>
  )
}
