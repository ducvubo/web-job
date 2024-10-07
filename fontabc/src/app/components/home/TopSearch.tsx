import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@radix-ui/react-select'
import React from 'react'

export default function TopSearch() {
  const tags = Array.from({ length: 50 }).map((_, i, a) => <span key={i}> `v1.2.0-beta.${a.length - i}`</span>)
  return (
    <section className='h-[600px] bg-[#f4f5f5] px-48'>
      <div className='font-semibold text-3xl pb-5 pt-10 text-[#00b14f]'>Từ khoá tìm việc làm phổ biến tại TopCV</div>
      <div className='flex gap-9'>
        <ScrollArea className='h-[450px] w-[400px] rounded-md border mt-8'>
          <div className='mx-auto ml-4 pt-4 text-base font-semibold leading-none sticky top-0 bg-[#f4f5f5] h-[40px]'>
            Tìm việc làm theo ngành nghề
          </div>
          <div className='mx-4 mb-2 flex flex-col justify-center'>
            {tags.map((tag, index) => (
              <div key={index}>
                <div className='text-sm my-[5px] font-medium'>Việc làm theo {tag}</div>
                <div className='border'></div>
                <Separator className='my-2' />
              </div>
            ))}
          </div>
        </ScrollArea>
        <ScrollArea className='h-[450px] w-[400px] rounded-md border mt-8'>
          <div className='mx-auto ml-4 pt-4 text-base font-semibold leading-none sticky top-0 bg-[#f4f5f5] h-[40px]'>
            Tìm việc làm theo ngành nghề
          </div>
          <div className='mx-4 mb-2 flex flex-col justify-center'>
            {tags.map((tag, index) => (
              <div key={index}>
                <div className='text-sm my-[5px] font-medium'>Việc làm theo {tag}</div>
                <div className='border'></div>
                <Separator className='my-2' />
              </div>
            ))}
          </div>
        </ScrollArea>
        <ScrollArea className='h-[450px] w-[400px] rounded-md border mt-8'>
          <div className='mx-auto ml-4 pt-4 text-base font-semibold leading-none sticky top-0 bg-[#f4f5f5] h-[40px]'>
            Tìm việc làm theo ngành nghề
          </div>
          <div className='mx-4 mb-2 flex flex-col justify-center'>
            {tags.map((tag, index) => (
              <div key={index}>
                <div className='text-sm my-[5px] font-medium'>Việc làm theo {tag}</div>
                <div className='border'></div>
                <Separator className='my-2' />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </section>
  )
}
