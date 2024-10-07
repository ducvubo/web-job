import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiBuildings } from 'react-icons/bi'
import { FaBuilding, FaGlobe, FaLocationDot, FaRegCopy, FaUsers } from 'react-icons/fa6'
import { MdOutlineNavigateNext } from 'react-icons/md'
import DescriptionCongTy from './_component/Description'
import { Input } from '@/components/ui/input'
import TextCopy from './_component/TextCopy'
import { sendRequest } from '@/lib/api'
import { ICompanyList } from '@/app/dashboard/admin/company/Company.interface'
import { redirect } from 'next/navigation'

export default async function InforCongTy({ params }: { params: { slug: string } }) {
  const inforCongty: IBackendRes<ICompanyList> = await sendRequest({
    method: 'GET',
    url: `${process.env.API_BACKEND}/companies/slug/${params.slug}`,
    nextOption: {
      cache: 'no-store'
    }
  })
  if (!inforCongty.metaData) redirect('/cong-ty')
  return (
    <div className=' h-auto px-48 bg-[#f3f5f7] pb-10'>
      <div className='flex my-6'>
        <Link href={'/cong-ty'}>
          <span className='text-sm'>Danh sách Công ty</span>
        </Link>
        <MdOutlineNavigateNext className='mt-[6px] text-sm' />
        <span className='text-sm mt-[2px]'>
          Thông tin công ty & tin tuyển dụng từ {inforCongty.metaData.company_name}
        </span>
      </div>
      <div>
        <Image
          src={
            inforCongty.metaData.company_banner.image_url_local ||
            inforCongty.metaData.company_banner.image_url_cloud ||
            inforCongty.metaData.company_banner.image_url_custom
          }
          width={1140}
          height={224}
          alt='vuducbo'
          className='rounded-t-lg w-[1140px] h-[224px] object-cover'
        />
        <div className='bg-gradient-to-r from-[#212f3f] to-[#00b14f] h-32 rounded-b-lg relative flex'>
          <Image
            src={
              inforCongty.metaData.company_avatar.image_url_local ||
              inforCongty.metaData.company_avatar.image_url_cloud ||
              inforCongty.metaData.company_avatar.image_url_custom
            }
            width={180}
            height={180}
            alt='vuducbo'
            className='bg-white rounded-full absolute bottom-[46px] left-11 w-[180px] h-[180px] object-cover'
          />
          <div className='ml-64 mt-5 flex flex-col w-[560px]'>
            <span className='font-bold text-xl line-clamp-1 text-white '>{inforCongty.metaData.company_name}</span>
            <div className='mt-4 flex gap-5'>
              {inforCongty.metaData.company_website && (
                <span className='flex text-white gap-3 text-sm'>
                  <FaGlobe className='' fontSize='1.2em' />
                  {inforCongty.metaData.company_website}
                </span>
              )}
              <span className='flex text-white gap-3 text-sm'>
                <FaBuilding className='' fontSize='1.2em' /> {inforCongty.metaData.company_employee_total}
              </span>
              <span className='flex text-white gap-3 text-sm'>
                <FaUsers className='' fontSize='1.2em' /> 307 người theo dõi
              </span>
            </div>
          </div>

          <Button
            variant={'outline'}
            className='text-[#00b14f] font-normal hover:text-[#00b14f] w-48 h-12 text-lg ml-20 my-auto'
          >
            <span className='text-3xl mb-1'>+</span> Theo dõi công ty
          </Button>
        </div>
      </div>
      <div className='flex'>
        <div className='mt-8'>
          <div className='bg-gradient-to-r from-[#212f3f] to-[#00b14f] rounded-t-lg w-[750px] h-12'>
            <span className='font-bold text-lg line-clamp-1 text-white ml-7 pt-[11px]'>Giới thiệu công ty</span>
          </div>
          <DescriptionCongTy company_description={inforCongty.metaData.company_description} />
        </div>
        <div className='mt-8 w-[360px] ml-10'>
          <div>
            <div className='bg-gradient-to-r from-[#212f3f] to-[#00b14f] rounded-t-lg  h-12'>
              <span className='font-bold text-lg line-clamp-1 text-white ml-7 pt-[11px]'>Thông tin liên hệ</span>
            </div>
            <div className='px-6 pt-4 bg-white rounded-b-lg pb-5'>
              <div className='flex  gap-3'>
                <FaLocationDot fontSize='1.2em' color='red' /> Địa chỉ công ty
              </div>
              {inforCongty.metaData.company_address.map((item: any, index) => {
                return (
                  <div key={index} className='mt-2 text-[#4d5965] font-normal text-sm'>
                    {item.company_address_specific}
                  </div>
                )
              })}
            </div>
          </div>
          <div className='mt-8'>
            <div className='bg-gradient-to-r from-[#212f3f] to-[#00b14f] rounded-t-lg  h-12'>
              <span className='font-bold text-lg line-clamp-1 text-white ml-7 pt-[11px]'>
                Chia sẻ công ty tới bạn bè
              </span>
            </div>
            <div className='px-6 pt-4 bg-white rounded-b-lg pb-5 flex flex-col gap-3'>
              <span>Sao chép đường dẫn</span>
              <TextCopy />
              <span> Chia sẻ qua mạng xã hội</span>
              <div className='flex gap-4'>
                <div className='rounded-full border w-[50px] h-[50px] flex justify-center items-center'>
                  <Image
                    src={'/images/facebook1.webp'}
                    width={30}
                    height={30}
                    alt='vuducbo'
                    className='w-[30px] h-[30px] '
                  />
                </div>
                <div className='rounded-full border w-[50px] h-[50px] flex justify-center items-center'>
                  <Image
                    src={'/images/twitter1.webp'}
                    width={30}
                    height={30}
                    alt='vuducbo'
                    className='w-[30px] h-[30px] rounded-full'
                  />
                </div>
                <div className='rounded-full border w-[50px] h-[50px] flex justify-center items-center'>
                  <Image
                    src={'/images/linked1.webp'}
                    width={30}
                    height={30}
                    alt='vuducbo'
                    className='w-[30px] h-[30px] rounded-full'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
