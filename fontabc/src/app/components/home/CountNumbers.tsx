'use client'
import React, { useState, useEffect } from 'react'

export default function CountNumbers({ number }: { number: number }) {
  const [numberState, setNumberState] = useState(0)

  useEffect(() => {
    if (numberState < number) {
      const increment = number / ((3 * 1000) / 100) // số lần cập nhật mỗi 10ms
      const interval = setInterval(() => {
        setNumberState((prev) => {
          if (prev + increment >= number) {
            clearInterval(interval)
            return number
          }
          return prev + increment
        })
      }, 10)

      return () => clearInterval(interval)
    }
  }, [number, numberState])

  return <div>{Math.floor(numberState).toLocaleString('vi-VN')}</div>
}
