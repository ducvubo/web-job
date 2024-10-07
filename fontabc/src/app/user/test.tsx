// 'use client'
// import { Button } from '@/components/ui/button'
// import { Input, InputBanner } from '@/components/ui/input'
// import React, { useState } from 'react'

// export default function TestInput({
//   data,
//   setData
// }: {
//   data: string[]
//   setData: React.Dispatch<React.SetStateAction<string[]>>
// }) {
//   const [inputValue, setInputValue] = useState('')
//   const deleteArr = (index: number) => {
//     const newData = [...data]
//     newData.splice(index, 1)
//     setData(newData)
//   }
//   const addToArr = () => {
//     if (inputValue.trim() !== '') {
//       setData([...data, inputValue])
//       setInputValue('')
//     }
//   }

//   const handleKeyPress = (event: any) => {
//     if (event.key === 'Enter') {
//       addToArr()
//     }
//   }
//   return (
//     <div className='relative rounded border border-solid border-black bg-white p-2 shadow-sm max-w-[30rem]  min-w-[10rem] '>
//       <div className='flex flex-1 flex-wrap items-center gap-2 pl-2'>
//         <ul className='flex flex-wrap items-center gap-2'>
//           {data.map((language, index) => {
//             return (
//               <li key={index}>
//                 <span className='whitespace-nowrap rounded border border-solid font-normal transition-all group/tw-chip inline-flex items-center justify-center gap-0 overflow-hidden hover:gap-2 border-gray-200 bg-gray-200 text-gray-600 h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm lg:h-[2.375rem] lg:px-3 lg:text-base'>
//                   {language}
//                   <span
//                     className=' transition-all group-hover/tw-chip:max-w-none cursor-pointer max-w-none overflow-auto'
//                     onClick={() => deleteArr(index)}
//                   >
//                     <svg
//                       stroke='currentColor'
//                       fill='currentColor'
//                       strokeWidth={0}
//                       viewBox='0 0 24 24'
//                       aria-hidden='true'
//                       height='1em'
//                       width='1em'
//                       xmlns='http://www.w3.org/2000/svg'
//                     >
//                       <path
//                         fillRule='evenodd'
//                         d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
//                         clipRule='evenodd'
//                       />
//                     </svg>
//                   </span>
//                 </span>
//               </li>
//             )
//           })}
//         </ul>
//         <InputBanner
//           type='text'
//           id='search'
//           className='ml-2 w-full min-w-[20rem] flex-1 border-none text-sm outline-none focus:border-none focus:outline-none focus:ring-0 lg:text-base'
//           placeholder='Tìm kiếm theo các Kỹ năng, Vị trí, Công ty,...'
//           name='search'
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyPress={handleKeyPress}
//         />
//       </div>
//     </div>
//   )
// }

'use client'
import React, { useState } from 'react'
import clsx from 'clsx'

export default function TestInput({
  data,
  setData,
  tag,
  className, // Nhận thêm prop className để tuỳ chỉnh CSS
  inputClassName, // Tuỳ chỉnh CSS cho Input
  listClassName // Tuỳ chỉnh CSS cho list
}: {
  data: string[]
  setData: React.Dispatch<React.SetStateAction<string[]>>
  tag?: string
  className?: string
  inputClassName?: string
  listClassName?: string
}) {
  const [inputValue, setInputValue] = useState('')

  const deleteArr = (index: number) => {
    const newData = [...data]
    newData.splice(index, 1)
    setData(newData)
  }

  const addToArr = () => {
    if (inputValue.trim() !== '') {
      setData([...data, inputValue])
      setInputValue('')
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addToArr()
    }
  }

  return (
    <div
      className={clsx(
        'relative rounded border border-solid border-black bg-white p-2 shadow-sm max-w-[30rem] min-w-[10rem]',
        className
      )}
    >
      <div className={clsx('flex flex-1 flex-wrap items-center gap-2 pl-2', listClassName)}>
        <ul className='flex flex-wrap items-center gap-2'>
          {data.map((language, index) => {
            return (
              <li key={index}>
                <span className='whitespace-nowrap rounded border border-solid font-normal transition-all group/tw-chip inline-flex items-center justify-center gap-0 overflow-hidden hover:gap-2 border-gray-200 bg-gray-200 text-gray-600 h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm lg:h-[2.375rem] lg:px-3 lg:text-base'>
                  {language}
                  <span
                    className='transition-all group-hover/tw-chip:max-w-none cursor-pointer max-w-none overflow-auto'
                    onClick={() => deleteArr(index)}
                  >
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth={0}
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </span>
                </span>
              </li>
            )
          })}
        </ul>
        <input
          type='text'
          className={clsx(
            'ml-2 w-full min-w-[20rem] flex-1 border-none text-sm outline-none focus:border-none focus:outline-none focus:ring-0 lg:text-base',
            inputClassName
          )}
          placeholder={tag ? `${tag}` : 'Thêm tag...'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  )
}
