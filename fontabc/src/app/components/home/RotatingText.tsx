'use client'
import React, { useState, useEffect } from 'react'

const RotatingText = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const texts = [
    'Việc làm mới ',
    'Công ty phù hợp ',
    'Phúc lợi tốt ',
    'Thông tin thị trường ',
    'Mức lương cao ',
    'CV mới '
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {texts.map((text, index) => (
        <span key={index} className={`text-3xl font-bold text-[#00b14f] ${index === activeIndex ? 'block' : 'hidden'}`}>
          {text}
        </span>
      ))}
    </div>
  )
}

export default RotatingText
