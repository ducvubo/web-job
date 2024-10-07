import { InputBanner } from '@/components/ui/input'
import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { sendRequest } from '@/lib/api'
import { CompanyAvatar, CompanyBanner, CompanyDescription } from '../dashboard/admin/company/Company.interface'
import Link from 'next/link'

interface CompanyList {
  company_name: string
  company_description: CompanyDescription
  company_avatar: CompanyAvatar
  company_banner: CompanyBanner
  company_slug: string
}

export default async function CongTyPage() {
  const listCompany: IBackendRes<CompanyList[]> = await sendRequest({
    method: 'GET',
    url: `${process.env.API_BACKEND}/companies/all`,
    nextOption: {
      cache: 'no-store'
    }
  })

  return (
    <div>
      <div className='bg-[#dbffeb] h-[328px] px-28 flex'>
        <div className='flex flex-col pt-14'>
          <span className='text-[#00b14f] text-2xl font-medium pb-4'>Khám phá 100.000+ công ty nổi bật</span>
          <span className='pb-8'>Tra cứu thông tin công ty và tìm kiếm nơi làm việc tốt nhất dành cho bạn</span>
          <div className='flex w-[545px] rounded-full bg-[#fff] border hover:border-[#00b14f]'>
            <CiSearch fontSize='1.6em' opacity='0.3' className='mt-2 ml-3' />
            <InputBanner placeholder='Nhập tên công ty' />
            <Button variant={'topcv'} className='rounded-full h-8 my-auto mx-3'>
              Tìm kiếm
            </Button>
          </div>
        </div>
        <Image src={'/images/banner-company.webp'} width={272} height={304} alt='Banner' className='ml-[480px]' />
      </div>
      <span className='font-semibold text-2xl flex justify-center items-center my-6'>
        DANH SÁCH CÁC CÔNG TY NỔI BẬT
      </span>

      <div className='grid grid-cols-3 px-28 justify-center items-center'>
        {listCompany?.metaData?.map((company, index) => {
          return (
            <Card key={index} className='h-[424px] w-[400px] m-auto my-3 relative'>
              <Link href={`/cong-ty/${company.company_slug}`}>
                <Image
                  src={
                    company.company_banner.image_url_cloud ||
                    company.company_banner.image_url_custom ||
                    company.company_banner.image_url_local
                  }
                  width={1200}
                  height={220}
                  alt='vuducbo'
                  className='rounded-t-lg h-[150px] w-[425px] object-cover'
                />
              </Link>
              <Link href={`/cong-ty/${company.company_slug}`}>
                <Image
                  src={
                    company.company_avatar.image_url_cloud ||
                    company.company_avatar.image_url_custom ||
                    company.company_avatar.image_url_local
                  }
                  width={1024}
                  height={1024}
                  alt='vuducbo'
                  className='w-16 h-16 object-cover  bg-white  rounded-lg border border-[#dbffeb] absolute top-[117px] left-6'
                />
              </Link>
              <CardTitle className='text-sm uppercase mt-14 mx-5'>
                <Link href={`/cong-ty/${company.company_slug}`}>{company.company_name}</Link>
              </CardTitle>
              <CardDescription className='mx-5 line-clamp-[7] mt-4'>{company.company_description.text}</CardDescription>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
