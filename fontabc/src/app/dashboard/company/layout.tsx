// 'use client'
import * as React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { SideBar } from '../_component/SideBar'
import { ResizableHandle, ResizablePanel } from '@/components/ui/resizable'
export default function CompanyLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const defaultLayout = [20, 10, 48]
  return (
    <main>
      <SideBar>
        <ResizablePanel defaultSize={defaultLayout[2]} className='!w-[500px]'>
          <ScrollArea className='h-full w-full px-4 '>{children}</ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]}>
          <div>sadgsg</div>
        </ResizablePanel>
      </SideBar>
    </main>
  )
}
