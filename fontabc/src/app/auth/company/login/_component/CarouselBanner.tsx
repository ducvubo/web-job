'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carsousel.custom'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
export default function CarouselBanner() {
  return (
    <Carousel className='w-full '>
      <CarouselContent className='h-screen !m-0'>
        <CarouselItem className='h-screen p-0'>
          <div>
            <Image src={'/images/banner-01.webp'} width={514} height={879} alt='vuducbo' />
          </div>
        </CarouselItem>
        <CarouselItem className='h-screen p-0'>
          <div>
            <Image src={'/images/banner-02.webp'} width={514} height={879} alt='vuducbo' />
          </div>
        </CarouselItem>
        <CarouselItem className='h-screen p-0'>
          <div>
            <Image src={'/images/banner-03.webp'} width={514} height={879} alt='vuducbo' />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
