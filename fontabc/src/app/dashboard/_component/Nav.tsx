import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export interface NavProps {
  isCollapsed: boolean
  link: {
    title: string
    label?: string
    icon: LucideIcon
    variant: 'default' | 'ghost' | 'link' | 'topcv' | 'destructive' | 'outline' | 'secondary' | null | undefined
    link?: string
    children?: any
  }[]
  pathname?: string
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export function Nav({ link, isCollapsed, pathname, setIsCollapsed }: NavProps) {
  const links = link.map((item) => {
    if (item.link === pathname) {
      return {
        ...item,
        variant: 'topcv' as
          | 'default'
          | 'ghost'
          | 'link'
          | 'topcv'
          | 'destructive'
          | 'outline'
          | 'secondary'
          | null
          | undefined
      }
    }
    return item
  })


  return (
    <div data-collapsed={isCollapsed} className='group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2'>
      <nav className='grid gap-1  group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
        <ScrollArea className='h-[620px]'>
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    // href={link.link || '#'}
                    href={link.link ? `${process.env.NEXT_PUBLIC_HOST_FRONTEND}${link.link}` : '#'}
                    className={cn(
                      buttonVariants({ variant: link.variant, size: 'icon' }),
                      'h-9 w-9',
                      link.variant === 'default' &&
                        'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                    )}
                  >
                    <link.icon className='h-4 w-4' />
                    <span className='sr-only'>{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side='right' className='flex items-center gap-4'>
                  {link.title}
                  {link.label && <span className='ml-auto text-muted-foreground'>{link.label}</span>}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Accordion type='single' collapsible className='w-auto pr-3' key={index}>
                <AccordionItem value='item-1'>
                  <AccordionTrigger
                    className={`h-14 hover:no-underline cursor-pointer ${
                      link.variant === 'topcv' ? 'bg-[#00b14f] rounded-xl text-white' : 'bg-white'
                    }`}
                  >
                    <div className='flex justify-center items-center'>
                      <Label className='cursor-pointer ml-5'>{link.title}</Label>
                      {/* <link.icon className='mr-2 h-4 w-4 ' /> */}
                    </div>
                  </AccordionTrigger>
                  {link?.children?.map((item: any, index: number) => {
                    return (
                      <AccordionContent key={index} className='h-12 flex flex-col'>
                        <Label className='flex ml-10 pt-4'>
                          <Link href={item.link}>{item.title}</Link>
                        </Label>
                        <div className='pt-[17px]'>
                          <Separator className='' />
                        </div>
                      </AccordionContent>
                    )
                  })}
                </AccordionItem>
              </Accordion>
            )
          )}
        </ScrollArea>
      </nav>
    </div>
  )
}
