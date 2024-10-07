'use client'
import React, { useState, useEffect } from 'react'

const CountTime = () => {
  const calculateTimeLeft = () => {
    const now: any = new Date()
    const endOfDay: any = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
    const difference = endOfDay - now

    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    } else {
      timeLeft = { hours: 0, minutes: 0, seconds: 0 }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft())
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!isClient) {
    return (
      <div className='flex gap-4'>
        <div className='bg-custom-gradient-counttime flex flex-col justify-center items-center w-[68px] h-[70px] rounded-xl'>
          <span className='font-bold text-3xl text-white'>00</span>
          <span className='font-semibold text-sm text-white'>Giờ</span>
        </div>
        <span className='text-white font-bold text-4xl mt-[4px]'>.</span>
        <div className='bg-custom-gradient-counttime flex flex-col justify-center items-center w-[68px] h-[70px] rounded-xl'>
          <span className='font-bold text-3xl text-white'>00</span>
          <span className='font-semibold text-sm text-white'>Phút</span>
        </div>
        <span className='text-white font-bold text-4xl mt-[4px]'>.</span>
        <div className='bg-custom-gradient-counttime flex flex-col justify-center items-center w-[68px] h-[70px] rounded-xl'>
          <span className='font-bold text-3xl text-white'>00</span>
          <span className='font-semibold text-sm text-white'>Giây</span>
        </div>
      </div>
    )
  }

  return (
    <div className='flex gap-4'>
      <div className='bg-custom-gradient-counttime flex flex-col justify-center items-center w-[68px] h-[70px] rounded-xl'>
        <span className='font-bold text-3xl text-white'>{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className='font-semibold text-sm text-white'>Giờ</span>
      </div>
      <span className='text-white font-bold text-4xl mt-[4px]'>.</span>
      <div className='bg-custom-gradient-counttime flex flex-col justify-center items-center w-[68px] h-[70px] rounded-xl'>
        <span className='font-bold text-3xl text-white'>{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className='font-semibold text-sm text-white'>Phút</span>
      </div>
      <span className='text-white font-bold text-4xl mt-[4px]'>.</span>
      <div className='bg-custom-gradient-counttime flex flex-col justify-center items-center w-[68px] h-[70px] rounded-xl'>
        <span className='font-bold text-3xl text-white'>{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className='font-semibold text-sm text-white'>Giây</span>
      </div>
    </div>
  )
}

export default CountTime
