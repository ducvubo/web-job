'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Separator } from '@/components/ui/separator'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Nav } from './Nav'
import { conTenSideBarAdmin, conTenSideBarCompany } from '@/app/dashboard/_component/ContentSideBar'
import { useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import { cookies } from 'next/headers'
import { RootState } from '@/app/redux/store'

interface SideBarProps {
  defaultLayout?: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize?: number
  children: React.ReactNode
}

export function SideBar({
  defaultLayout = [10, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize = 4,
  children
}: SideBarProps) {
  const path = usePathname()
  const pathname = path.split('/').slice(0, 4).join('/')

  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const inforUser = useSelector((state: RootState) => state.inforUser)
    ? useSelector((state: RootState) => state.inforUser)
    : null

  const inforCompany = useSelector((state: RootState) => state.inforCompany)
    ? useSelector((state: RootState) => state.inforCompany)
    : null

  const segments = path.split('/').filter(Boolean) // Tách URL thành các phần và lọc bỏ phần trống

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction='horizontal'
        onLayout={(sizes: number[]) => {}}
        className='h-full max-h-[800px] items-stretch'
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={10}
          maxSize={55}
          onCollapse={() => {
            setIsCollapsed(true)
          }}
          onResize={() => {
            setIsCollapsed(false)
          }}
          className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out !max-w-16')}
        >
          <div className={cn('flex h-[52px] items-center justify-center', isCollapsed ? 'h-[52px]' : 'px-2')}>
            {inforUser?.name ? inforUser.name : inforCompany ? inforCompany.company_email : null}
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            link={segments[1] === 'admin' ? conTenSideBarAdmin : conTenSideBarCompany}
            pathname={pathname}
          />
          {/* <Separator />
          <Nav isCollapsed={isCollapsed} link={conTenSideBarAdmin} pathname={pathname} /> */}
        </ResizablePanel>
        <ResizableHandle withHandle />
        {children}
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
