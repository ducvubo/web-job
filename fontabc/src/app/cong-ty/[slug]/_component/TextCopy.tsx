'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { FaRegCopy } from 'react-icons/fa6'
import { toast } from 'sonner'

export default function TextCopy() {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setInputValue(window.location.href)
  }, [])
  const handleCopy = () => {
    navigator.clipboard
      .writeText(inputValue)
      .then(() => {
        toast.success('Sao chép thành công!')
      })
      .catch((err) => {
        console.error('Could not copy text: ', err)
      })
  }
  return (
    <div className='flex gap-3 relative'>
      <Input disabled value={inputValue} className='w-[270px] truncate' />
      <Button variant={'topcv'} className='absolute left-64' onClick={handleCopy}>
        <FaRegCopy />
      </Button>
    </div>
  )
}
