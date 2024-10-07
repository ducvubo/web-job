'use client'

import * as React from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { FaArrowTrendUp } from 'react-icons/fa6'
const chartData = [
  { date: '2024-04-01', job: 21022 },
  { date: '2024-04-02', job: 1097 },
  { date: '2024-04-03', job: 11067 },
  { date: '2024-04-04', job: 21042 },
  { date: '2024-04-05', job: 31073 },
  { date: '2024-04-06', job: 31001 },
  { date: '2024-04-07', job: 21045 },
  { date: '2024-04-08', job: 41009 },
  { date: '2024-04-09', job: 1059 },
  { date: '2024-04-10', job: 21061 },
  { date: '2024-04-11', job: 31027 },
  { date: '2024-04-12', job: 21092 },
  { date: '2024-04-13', job: 31042 },
  { date: '2024-04-14', job: 11037 },
  { date: '2024-04-15', job: 11020 },
  { date: '2024-04-16', job: 11038 },
  { date: '2024-04-17', job: 41046 },
  { date: '2024-04-18', job: 31064 },
  { date: '2024-04-19', job: 21043 },
  { date: '2024-04-20', job: 1089 },
  { date: '2024-04-21', job: 11037 },
  { date: '2024-04-22', job: 21024 },
  { date: '2024-04-23', job: 11038 },
  { date: '2024-04-24', job: 31087 },
  { date: '2024-04-25', job: 21015 },
  { date: '2024-04-26', job: 1075 },
  { date: '2024-04-27', job: 31083 },
  { date: '2024-04-28', job: 11022 },
  { date: '2024-04-29', job: 31015 },
  { date: '2024-04-30', job: 41054 }
]

const chartConfig = {
  views: {
    label: 'Việc làm'
  },
  job: {
    label: 'Việc làm',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

export function LineChartMarket() {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>('job')

  const total = React.useMemo(
    () => ({
      job: chartData.reduce((acc, curr) => acc + curr.job, 0)
    }),
    []
  )
  // const CustomAxisTick = ({ x, y, payload }: any) => {
  //   return <text style={{ fill: '#ffffff' }}></text>
  // }
  return (
    // <Card>
    //   <CardContent className='px-2 sm:p-6'>
    <div>
      <div className='flex ml-2 mt-2'>
        <span className='ml-2 font-semibold text-sm text-white mt-2'>Tăng trưởng cơ hội việc làm</span>
        <div className='ml-2 mt-2'>
          <FaArrowTrendUp color='#00b14f' fontSize='1.2em' />
        </div>
      </div>
      <ChartContainer config={chartConfig} className='aspect-auto h-[250px] w-[360px] mt-2 mx-4'>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12
          }}
        >
          <XAxis
            dataKey='date'
            // tick={CustomAxisTick}
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            minTickGap={10}
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString('vi-VN', {
                day: 'numeric',
                month: 'short'
              })
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className='w-[150px]'
                nameKey='views'
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString('vi-VN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })
                }}
              />
            }
          />
          <Line
            dataKey={activeChart}
            type='monotone'
            stroke={`var(--color-${activeChart})`}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
    //   {/* </CardContent>
    // </Card> */}
  )
}
