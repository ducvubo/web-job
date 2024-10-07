'use client'
import { Bar, BarChart, XAxis } from 'recharts'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'

const chartData = [
  { browser: 'Kinh doanh', visitors: 14923, fill: 'var(--color-chrome)' },
  { browser: 'Marketing ', visitors: 7808, fill: 'var(--color-safari)' },
  { browser: 'Dịch vụ', visitors: 5102, fill: 'var(--color-firefox)' },
  { browser: 'Văn phòng', visitors: 4678, fill: 'var(--color-edge)' },
  { browser: 'Tư vấn', visitors: 4629, fill: 'var(--color-other)' }
]

const chartConfig = {
  visitors: {
    label: 'Nhu cầu tuyển dụng: '
  },
  chrome: {
    color: '#11d769'
  },
  safari: {
    color: '#308aff'
  },
  firefox: {
    color: '#da8300'
  },
  edge: {
    color: '#1cfff1'
  },
  other: {
    color: '#ffe700'
  }
} satisfies ChartConfig

const CustomAxisTick = ({ x, y, payload }: any) => {
  return (
    <text x={x} y={y + 10} textAnchor='middle' style={{ fill: '#ffffff' }}>
      {payload.value}
    </text>
  )
}
export function Chart() {
  return (
    <div>
      <div className='flex ml-6 mt-2'>
        <Image src={'/images/trend-hr-chart.webp'} height={24} width={24} alt='vuducbo' />
        <span className='ml-2 font-semibold text-sm text-white mt-2'>Nhu cầu tuyển dụng theo</span>
        <div className='w-5'>
          <Select>
            <SelectTrigger className='w-[140px] h-9 ml-44 bg-[#1a6547] border-green-400 text-[#11d769] font-medium focus:ring-0 focus:ring-offset-0'>
              <SelectValue placeholder='Ngành nghề' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='apple'>Ngành nghề</SelectItem>
                <SelectItem value='banana'>Mức lương</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={chartData}
          width={200}
          height={300}
          margin={{ left: 50, right: 50, bottom: 150, top: 20 }}
        >
          <XAxis dataKey='visitors' tickLine={false} tickMargin={10} axisLine={false} tick={CustomAxisTick} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey='visitors' strokeWidth={2} radius={4} barSize={85} />
        </BarChart>
      </ChartContainer>
      <div className='-mt-36 ml-14 grid grid-rows-3 grid-cols-3'>
        <div className='flex gap-2 mx-1'>
          <div className='w-[15px] h-[5px] bg-[#11d769] rounded mt-[5px]'></div>
          <span className='line-clamp-1 font-semibold text-xs text-[#a6acb2]'>Kinh doanh / Bán hàng</span>
        </div>
        <div className='flex gap-2 mx-1'>
          <div className='w-[15px] h-[5px] bg-[#308aff] rounded mt-[5px]'></div>
          <span className='line-clamp-1 font-semibold text-xs text-[#a6acb2]'>Marketing / Truyền thông</span>
        </div>
        <div className='flex gap-2 mx-1'>
          <div className='w-[15px] h-[5px] bg-[#308aff] rounded mt-[5px]'></div>
          <span className='line-clamp-1 font-semibold text-xs text-[#a6acb2]'>Dịch vụ khách hàng</span>
        </div>
        <div className='flex gap-2 mx-1'>
          <div className='w-[15px] h-[5px] bg-[#1cfff1] rounded mt-[5px]'></div>
          <span className='line-clamp-1 font-semibold text-xs text-[#a6acb2]'>Hành chính / Văn phòng</span>
        </div>
        <div className='flex gap-2 mx-1'>
          <div className='w-[15px] h-[5px] bg-[#ffe700] rounded mt-[5px]'></div>
          <span className='line-clamp-1 font-semibold text-xs text-[#a6acb2]'>Tư vấn</span>
        </div>
      </div>
    </div>
  )
}
