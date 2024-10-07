// 'use client'
import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import CarouselBanner from './_component/CarouselBanner'
import Image from 'next/image'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { LoginForm } from './_component/LoginForm'

export default function LoginCompany() {
  return (
    <ResizablePanelGroup direction='horizontal'>
      <ResizablePanel defaultSize={70}>
        <ScrollArea className='mx-56 my-28'>
          <Image src={'/images/topcv-logo.c9a1ca1.webp'} width={164} height={70} alt='vuducbo' />
          <div className='flex flex-col gap-2 mt-20'>
            <span className='font-bold text-2xl text-[#00b14f]'>Chào mừng bạn đã quay trở lại</span>
            <span className='text-[#212f3f] font-light'>
              Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ tuyển dụng ứng dụng sâu AI & Hiring
              Funnel
            </span>
          </div>

          <LoginForm />
        </ScrollArea>
      </ResizablePanel>
      <ResizablePanel defaultSize={30}>
        <CarouselBanner />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
