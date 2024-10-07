'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input, InputBanner } from '@/components/ui/input'
import { vi } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { JobBody, JobBodyType } from '@/app/schemaValidations/Job.schema'
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import React from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { IMarkDown } from '../job.interface'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { MdDeleteForever } from 'react-icons/md'
import { IoMdAddCircle } from 'react-icons/io'
import { getProvinceSummary } from '@/app/utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { addJob, updateJob } from '../api'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useLoading } from '@/context/LoadingContext'
import Tag from './Tag'
import { format } from 'date-fns'

const mdParser = new MarkdownIt()
const markdownDefault = {
  text: '',
  html: ''
}

interface IWageRange {
  min: number
  max: number
}

interface IWageWageIP {
  option: 'range' | 'down' | 'up' | 'negotiable' //mức lương | dưới | trên | thỏa thuận
  range?: IWageRange
  amount?: number
}

const exp = [
  { label: 'Không yêu cầu kinh nghiệm', value: 'Không yêu cầu kinh nghiệm' },
  { label: 'Dưới 1 năm kinh nghiệm', value: 'Dưới 1 năm kinh nghiệm' },
  { label: 'Dưới 1,5 năm kinh nghiệm', value: 'Dưới 1,5 năm kinh nghiệm' },
  { label: 'Dưới 2 năm kinh nghiệm', value: 'Dưới 2 năm kinh nghiệm' },
  { label: 'Dưới 2,5 năm kinh nghiệm', value: 'Dưới 2,5 năm kinh nghiệm' },
  { label: 'Dưới 3 năm kinh nghiệm', value: 'Dưới 3 năm kinh nghiệm' },
  { label: 'Dưới 3,5 năm kinh nghiệm', value: 'Dưới 3,5 năm kinh nghiệm' },
  { label: 'Dưới 4 năm kinh nghiệm', value: 'Dưới 4 năm kinh nghiệm' },
  { label: 'Dưới 5 năm kinh nghiệm', value: 'Dưới 5 năm kinh nghiệm' },
  { label: 'Dưới 5,5 năm kinh nghiệm', value: 'Dưới 5,5 năm kinh nghiệm' },
  { label: 'Dưới 6 năm kinh nghiệm', value: 'Dưới 6 năm kinh nghiệm' },
  { label: 'Dưới 6,5 năm kinh nghiệm', value: 'Dưới 6,5 năm kinh nghiệm' },
  { label: 'Dưới 7 năm kinh nghiệm', value: 'Dưới 7 năm kinh nghiệm' },
  { label: 'Dưới 7,5 năm kinh nghiệm', value: 'Dưới 7,5 năm kinh nghiệm' },
  { label: 'Dưới 8 năm kinh nghiệm', value: 'Dưới 8 năm kinh nghiệm' },
  { label: 'Dưới 8,5 năm kinh nghiệm', value: 'Dưới 8,5 năm kinh nghiệm' },
  { label: 'Dưới 9 năm kinh nghiệm', value: 'Dưới 9 năm kinh nghiệm' },
  { label: 'Dưới 9,5 năm kinh nghiệm', value: 'Dưới 9,5 năm kinh nghiệm' },
  { label: 'Dưới 10 năm kinh nghiệm', value: 'Dưới 10 năm kinh nghiệm' },
  { label: 'Trên 10 năm kinh nghiệm', value: 'Trên 10 năm kinh nghiệm' },
  { label: 'Trên 9 năm kinh nghiệm', value: 'Trên 9 năm kinh nghiệm' },
  { label: 'Trên 8 năm kinh nghiệm', value: 'Trên 8 năm kinh nghiệm' },
  { label: 'Trên 7 năm kinh nghiệm', value: 'Trên 7 năm kinh nghiệm' },
  { label: 'Trên 6 năm kinh nghiệm', value: 'Trên 6 năm kinh nghiệm' },
  { label: 'Trên 5 năm kinh nghiệm', value: 'Trên 5 năm kinh nghiệm' },
  { label: 'Trên 4 năm kinh nghiệm', value: 'Trên 4 năm kinh nghiệm' },
  { label: 'Trên 3 năm kinh nghiệm', value: 'Trên 3 năm kinh nghiệm' },
  { label: 'Trên 2 năm kinh nghiệm', value: 'Trên 2 năm kinh nghiệm' },
  { label: 'Trên 1 năm kinh nghiệm', value: 'Trên 1 năm kinh nghiệm' },
  { label: 'Trên 9,5 năm kinh nghiệm', value: 'Trên 9,5 năm kinh nghiệm' },
  { label: 'Trên 8,5 năm kinh nghiệm', value: 'Trên 8,5 năm kinh nghiệm' },
  { label: 'Trên 7,5 năm kinh nghiệm', value: 'Trên 7,5 năm kinh nghiệm' },
  { label: 'Trên 6,5 năm kinh nghiệm', value: 'Trên 6,5 năm kinh nghiệm' },
  { label: 'Trên 5,5 năm kinh nghiệm', value: 'Trên 5,5 năm kinh nghiệm' },
  { label: 'Trên 4,5 năm kinh nghiệm', value: 'Trên 4,5 năm kinh nghiệm' },
  { label: 'Trên 3,5 năm kinh nghiệm', value: 'Trên 3,5 năm kinh nghiệm' },
  { label: 'Trên 2,5 năm kinh nghiệm', value: 'Trên 2,5 năm kinh nghiệm' },
  { label: 'Trên 1,5 năm kinh nghiệm', value: 'Trên 1,5 năm kinh nghiệm' },
  { label: 'Từ 0 - 1 năm kinh nghiệm', value: 'Từ 0 - 1 năm kinh nghiệm' },
  { label: 'Từ 1 - 2 năm kinh nghiệm', value: 'Từ 1 - 2 năm kinh nghiệm' },
  { label: 'Từ 2 - 3 năm kinh nghiệm', value: 'Từ 2 - 3 năm kinh nghiệm' },
  { label: 'Từ 3 - 4 năm kinh nghiệm', value: 'Từ 3 - 4 năm kinh nghiệm' },
  { label: 'Từ 4 - 5 năm kinh nghiệm', value: 'Từ 4 - 5 năm kinh nghiệm' },
  { label: 'Từ 5 - 6 năm kinh nghiệm', value: 'Từ 5 - 6 năm kinh nghiệm' },
  { label: 'Từ 6 - 7 năm kinh nghiệm', value: 'Từ 6 - 7 năm kinh nghiệm' },
  { label: 'Từ 7 - 8 năm kinh nghiệm', value: 'Từ 7 - 8 năm kinh nghiệm' },
  { label: 'Từ 8 - 9 năm kinh nghiệm', value: 'Từ 8 - 9 năm kinh nghiệm' },
  { label: 'Từ 9 - 10 năm kinh nghiệm', value: 'Từ 9 - 10 năm kinh nghiệm' }
] as const

interface IAddress {
  id: string
  name: string
  name_en: string
  full_name: string
  full_name_en: string
  latitude: string
  longitude: string
}

interface IAddressData {
  error: number
  error_text: string
  data_name: string
  data: IAddress[]
}

export default function FormAddOrEditJob({ inforJob, id }: { inforJob: any; id: string }) {
  const router = useRouter()
  const { setLoading } = useLoading()
  const [job_requirements, setJob_requirements] = useState<IMarkDown>(markdownDefault)
  const [job_benefits, setJob_benefits] = useState<IMarkDown>(markdownDefault)
  const [job_additional_requirements, setJob_additional_requirements] = useState<IMarkDown>(markdownDefault)
  const [job_description, setJob_description] = useState<IMarkDown>(markdownDefault)
  const [job_career, setJob_career] = useState<{ name: string; _id: string }[]>([])
  const [job_skills, setJob_skills] = useState<{ name: string; _id: string }[]>([])
  const [job_area, setJob_area] = useState<{ name: string; _id: string }[]>([])
  const [job_wage, setJob_wage] = useState<IWageWageIP>({ option: 'range' })

  const [provinces, setProvinces] = useState<IAddress[]>([])
  const [districts, setDistricts] = useState<Record<number, IAddress[]>>({})
  const [wards, setWards] = useState<Record<number, IAddress[]>>({})

  const form = useForm<JobBodyType>({
    resolver: zodResolver(JobBody),
    defaultValues: {
      job_name: '',
      job_exp: '',
      job_rank: '',
      job_quantity: 0,
      job_working_type: '',
      job_gender: 'Không yêu cầu',
      job_isPublished: false,
      job_isDraft: true,
      job_start_date: new Date(),
      job_end_date: new Date(new Date().setDate(new Date().getDate() + 1)),
      job_specific_location: [
        { job_location_district: '', job_location_province: '', job_location_ward: '', job_specific_address: '' }
      ]
    },
    mode: 'onChange'
  })

  const { reset, watch, control, setValue, getValues } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'job_specific_location'
  })

  useEffect(() => {
    const handleAddressInitialization = async () => {
      if (inforJob && id !== 'add') {
        setJob_wage(inforJob.job_wage)

        setJob_additional_requirements({
          text: inforJob.job_additional_requirements?.text || '',
          html: inforJob.job_additional_requirements?.html || ''
        })
        setJob_benefits({
          text: inforJob.job_benefits?.text || '',
          html: inforJob.job_benefits?.html || ''
        })
        setJob_career(inforJob?.job_career || [])
        setJob_skills(inforJob?.job_skills || [])
        setJob_area(inforJob?.job_area || [])
        setJob_requirements({
          text: inforJob.job_requirements?.text || '',
          html: inforJob.job_requirements?.html || ''
        })
        setJob_description({
          text: inforJob.job_description?.text || '',
          html: inforJob.job_description?.html || ''
        })

        reset({
          job_name: inforJob.job_name || '',
          job_exp: inforJob.job_exp || '',
          job_rank: inforJob.job_rank || '',
          job_quantity: inforJob.job_quantity || 0,
          job_working_type: inforJob.job_working_type || '',
          job_gender: inforJob.job_gender || '',
          job_isPublished: inforJob.job_isPublished ? true : false,
          job_isDraft: inforJob.job_isDraft ? true : false,
          job_start_date: new Date(inforJob.job_start_date),
          job_end_date: new Date(inforJob.job_end_date)
        })

        for (let i = 0; i < inforJob.job_specific_location.length; i++) {
          const item = inforJob.job_specific_location[i]

          // Kích hoạt các sự kiện theo thứ tự
          await handleProvinceChange(i, item.job_location_province.id)
          await handleDistrictChange(i, item.job_location_district.id)
          await handleWardChange(i, item.job_location_ward.id)

          // Set giá trị cho địa chỉ cụ thể
          setValue(`job_specific_location.${i}.job_specific_address`, item.job_specific_address)

          // Thêm field mới sau khi hoàn thành
          if (i < inforJob.job_specific_location.length - 1) {
            append({
              job_location_province: '',
              job_location_district: '',
              job_location_ward: '',
              job_specific_address: ''
            })
          }
        }
        // Bỏ focus khỏi ô input sau khi xử lý xong
        const activeElement = document.activeElement as HTMLElement | null
        if (activeElement && typeof activeElement.blur === 'function') {
          activeElement.blur()
        }
        // Cuộn lên đầu trang
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    handleAddressInitialization()
  }, [inforJob, reset, id])

  const onChangeMarkdown = (text: string, html: string, type: string) => {
    switch (type) {
      case 'job_description':
        setJob_description({ text, html })
        break
      case 'job_benefits':
        setJob_benefits({ text, html })
        break
      case 'job_additional_requirements':
        setJob_additional_requirements({ text, html })
        break
      case 'job_requirements':
        setJob_requirements({ text, html })
        break
    }
  }

  const handleOptionWageChange = (value: string) => {
    const option = value as IWageWageIP['option']
    setJob_wage({ option })
  }

  const handleWageRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setJob_wage((prev) => ({
      ...prev,
      range: {
        ...prev.range,
        [name]: parseInt(value, 10)
      } as IWageRange
    }))
  }

  const handleAmountWageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJob_wage((prev) => ({
      ...prev,
      amount: parseInt(e.target.value, 10)
    }))
  }

  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
      const data: IAddressData = await response.json()
      setProvinces(data.data)
    }
    fetchProvinces()
  }, [])
  const fetchDistricts = async (provinceId: string, index: number) => {
    const response = await fetch(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`)
    const data: IAddressData = await response.json()
    setDistricts((prev) => ({
      ...prev,
      [parseInt(provinceId)]: data.data // Chỉ số là ID của tỉnh
    }))
    setValue(`job_specific_location.${index}.job_location_district`, '') // Reset district khi tỉnh thay đổi
    setValue(`job_specific_location.${index}.job_location_ward`, '') // Reset ward khi tỉnh thay đổi
  }

  const fetchWards = async (districtId: string, index: number) => {
    const response = await fetch(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`)
    const data: IAddressData = await response.json()
    setWards((prev) => ({
      ...prev,
      [parseInt(districtId)]: data.data // Chỉ số là ID của quận
    }))
    setValue(`job_specific_location.${index}.job_location_ward`, '') // Reset ward khi quận thay đổi
  }

  const handleProvinceChange = async (index: number, value: string) => {
    if (value) {
      setValue(`job_specific_location.${index}.job_location_province`, value)
      await fetchDistricts(value, index)
    }
  }

  const handleDistrictChange = async (index: number, value: string) => {
    if (value) {
      setValue(`job_specific_location.${index}.job_location_district`, value)
      await fetchWards(value, index)
    }
  }

  const handleWardChange = (index: number, value: string) => {
    if (value) {
      setValue(`job_specific_location.${index}.job_location_ward`, value)
    }
  }

  async function onSubmit(values: JobBodyType) {
    setLoading(true)
    const transformedValues = values.job_specific_location.map((location) => {
      // Tìm tỉnh dựa trên ID
      const province = provinces.find((p) => p.id === location.job_location_province) || { id: '', full_name: '' }

      // Tìm quận dựa trên ID và tỉnh tương ứng
      const districtList = districts[parseInt(location.job_location_province)] || []
      const district = districtList.find((d) => d.id === location.job_location_district) || { id: '', full_name: '' }

      // Tìm xã dựa trên ID và quận tương ứng
      const wardList = wards[parseInt(location.job_location_district)] || []
      const ward = wardList.find((w) => w.id === location.job_location_ward) || { id: '', full_name: '' }

      return {
        job_location_province: {
          id: province.id,
          full_name: province.full_name
        },
        job_location_district: {
          id: district.id,
          full_name: district.full_name
        },
        job_location_ward: {
          id: ward.id,
          full_name: ward.full_name
        },
        job_specific_address: location.job_specific_address
      }
    })
    if (!values.job_end_date || !values.job_start_date) {
      toast('Vui lòng chọn ngày tháng kết thúc và bắt đầu')
      return
    }
    if (values.job_end_date < values.job_start_date) {
      toast('Vui lòng chọn ngày kết thúc sau ngày bắt đầu')
      return
    }
    if (job_wage.option === 'range') {
      const { range } = job_wage
      if (range && range.max !== undefined && range.min !== undefined && range.max < range.min) {
        toast('Vui lòng nhập giá trị lương theo đúng khoảng')
        return
      }
    }

    // const job_specific_location = values.job_specific_location.map((item) => item.value)

    const payload = {
      ...values,
      job_wage,
      job_requirements,
      job_description,
      job_benefits,
      job_additional_requirements,
      job_address_summary: getProvinceSummary(transformedValues),
      job_specific_location: transformedValues,
      job_career,
      job_skills,
      job_area
    }

    if (id === 'add') {
      const res = await addJob(payload)

      if (res.statusCode === 201) {
        setLoading(false)
        // router.push('/dashboard/company/job')
        router.refresh()
        toast('Tạo job thành công, vui lòng chờ duyệt', {
          action: {
            label: 'Tắt',
            onClick: () => null
          }
        })
      }
      if (res.statusCode === 400) {
        setLoading(false)

        if (Array.isArray(res.message)) {
          res.message.map((item: string) => {
            toast.error(item)
          })
        } else {
          toast.error(res.message)
        }
      }
      if (res.statusCode === 409) {
        setLoading(false)

        toast.error(res.message)
      } else {
        setLoading(false)

        toast.error(res.message)
      }
    } else {
      try {
        const res = await updateJob(id, payload)
        if (res.statusCode === 200) {
          setLoading(false)

          router.push('/dashboard/company/job')
          router.refresh()
          toast('Chỉnh sửa job thành công', {
            action: {
              label: 'Tắt',
              onClick: () => null
            }
          })
        }
        if (res.statusCode === 400) {
          setLoading(false)
          if (Array.isArray(res.message)) {
            res.message.map((item: string) => {
              toast.error(item)
            })
          } else {
            toast.error(res.message)
          }
        }
        if (res.statusCode === 409) {
          setLoading(false)
          toast.error(res.message)
        }
      } catch (error) {
        setLoading(false)
        toast.error('Đã có lỗi xảy ra vui lòng thử lại')
        console.log(error)
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => {
          if (error.job_specific_location) {
            ;(error as any)?.job_specific_location.map((item: any) => {
              if (item.job_location_district) toast.error(item.job_location_district.message)
              if (item.job_location_ward) toast.error(item.job_location_ward.message)
              if (item.job_specific_address) toast.error(item.job_specific_address.message)
            })
            toast.error('Vui lòng kiểm tra lại thông tin')
          }
          console.log(error)
        })}
        className='space-y-2 flex-shrink-0 w-full pb-10'
      >
        <div className='grid grid-cols-3 gap-4 w-full'>
          <FormField
            control={form.control}
            name='job_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên tin tuyển dụng*</FormLabel>
                <FormControl>
                  <Input placeholder='Tên tin tuyển dụng' type='text' {...field} className='' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Label>Mức lương</Label>
            <Select value={job_wage.option} onValueChange={handleOptionWageChange}>
              <SelectTrigger className='w-full mt-2'>
                <SelectValue placeholder='Chọn mức lương' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Mức lương</SelectLabel>
                  <SelectItem value='range'>Từ x-y triệu</SelectItem>
                  <SelectItem value='down'>Dưới x triệu</SelectItem>
                  <SelectItem value='up'>Trên x triệu</SelectItem>
                  <SelectItem value='negotiable'>Thoả thuận</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {job_wage.option === 'range' && (
            <div className=''>
              <Label>Luơng</Label>
              <div className=' flex mt-2'>
                <span className='mt-2 ml-2'>Từ</span>
                <InputBanner
                  type='number'
                  name='min'
                  placeholder='Min'
                  value={job_wage.range?.min || ''}
                  onChange={handleWageRangeChange}
                  className='w-20'
                />
                <span className='mt-2 ml-2'>đến</span>
                <InputBanner
                  type='number'
                  name='max'
                  placeholder='Max'
                  value={job_wage.range?.max || ''}
                  onChange={handleWageRangeChange}
                  className='w-20'
                />
                <span className='mt-2 ml-2'>triệu</span>
              </div>
            </div>
          )}

          {(job_wage.option === 'down' || job_wage.option === 'up') && (
            <div>
              <Label>Luơng</Label>
              <div className='flex mt-2'>
                {job_wage.option === 'down' ? (
                  <span className='mt-2 mr-2'>Dưới</span>
                ) : (
                  <span className='mt-2 mr-2'>Trên</span>
                )}

                <Input
                  type='number'
                  placeholder='Số tiền'
                  value={job_wage.amount || ''}
                  onChange={handleAmountWageChange}
                />
                <span className='mt-2 ml-2'>triệu</span>
              </div>
            </div>
          )}

          {job_wage.option === 'negotiable' && (
            <div>
              <Label>Luơng</Label>
              <div className='flex mt-2'>
                <Input type='text' value={job_wage.option === 'negotiable' ? 'Thỏa thuận' : ''} disabled readOnly />
              </div>
            </div>
          )}
          <FormField
            control={form.control}
            name='job_exp'
            render={({ field }) => (
              <FormItem className=''>
                <FormLabel>Yêu cầu kinh nghiệm*</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? exp.find((exp) => exp.value === field.value)?.label : 'Select kinh nghiệm'}
                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-full p-0'>
                    <Command>
                      <CommandInput placeholder='Search framework...' className='h-9' />
                      <CommandList>
                        <CommandEmpty>No exp found.</CommandEmpty>
                        <CommandGroup>
                          {exp.map((exp) => (
                            <CommandItem
                              value={exp.label}
                              key={exp.value}
                              onSelect={() => {
                                form.setValue('job_exp', exp.value)
                              }}
                            >
                              {exp.label}
                              <CheckIcon
                                className={cn(
                                  'ml-auto h-4 w-4',
                                  exp.value === field.value ? 'opacity-100' : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='job_rank'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cấp bậc*</FormLabel>
                <FormControl>
                  <Input placeholder='Cấp bậc' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='job_quantity'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số lượng tuyển*</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Số lượng tuyển'
                    type='number'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='job_working_type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hình thức làm việc*</FormLabel>
                <FormControl>
                  <Input placeholder='Hình thức làm việc' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='job_gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yêu cầu giới tính</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a verified email to display' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='Nam'>Nam</SelectItem>
                    <SelectItem value='Nữ'>Nữ</SelectItem>
                    <SelectItem value='Không yêu cầu'>Không yêu cầu</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='job_start_date'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Ngày bắt đầu</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? format(field.value, 'dd/MM/yyyy', { locale: vi }) : <span>Pick a date</span>}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date.getTime() < new Date().setHours(0, 0, 0, 0)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='job_end_date'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Ngày bắt đầu</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? format(field.value, 'dd/MM/yyyy', { locale: vi }) : <span>Pick a date</span>}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date.getTime() < new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='w-full flex gap-3 pt-3'>
          <FormField
            control={form.control}
            name='job_isPublished'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-1/2'>
                <FormLabel>Trạng thái publish*</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='job_isDraft'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-1/2'>
                <FormLabel>Trạng thái bản nháp*</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className='w-full'>
          {fields.map((item, index) => (
            <div key={index} className='flex gap-4 w-full'>
              <Controller
                name={`job_specific_location.${index}.job_location_province`}
                control={control}
                render={({ field }) => (
                  <FormItem className='flex flex-col mt-3 w-full'>
                    <FormLabel>Tỉnh/Thành *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                          >
                            {field.value
                              ? provinces.find((province) => province.id === field.value)?.full_name
                              : 'Chọn Tỉnh/Thành'}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[200px] p-0'>
                        <Command>
                          <CommandInput placeholder='Tìm kiếm tỉnh/thành...' className='h-9' />
                          <CommandList>
                            <CommandEmpty>Không tìm thấy tỉnh/thành nào.</CommandEmpty>
                            <CommandGroup>
                              {provinces.map((province) => (
                                <CommandItem
                                  value={province.full_name}
                                  key={province.id}
                                  onSelect={() => {
                                    handleProvinceChange(index, province.id)
                                  }}
                                >
                                  {province.full_name}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      province.id === field.value ? 'opacity-100' : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                name={`job_specific_location.${index}.job_location_district`}
                control={control}
                render={({ field }) => (
                  <FormItem className='flex flex-col mt-3 w-full'>
                    <FormLabel>Quận/Huyện *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                          >
                            {field.value
                              ? (
                                  districts[
                                    parseInt(form.getValues(`job_specific_location.${index}.job_location_province`))
                                  ] || []
                                ).find((district) => district.id === field.value)?.full_name
                              : 'Chọn Tỉnh/Thành'}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[200px] p-0'>
                        <Command>
                          <CommandInput placeholder='Tìm kiếm quận/huyện...' className='h-9' />
                          <CommandList>
                            <CommandEmpty>Không tìm thấy quận/huyện nào.</CommandEmpty>
                            <CommandGroup>
                              {(
                                districts[
                                  parseInt(form.getValues(`job_specific_location.${index}.job_location_province`))
                                ] || []
                              ).map((district) => (
                                <CommandItem
                                  value={district.full_name}
                                  key={district.id}
                                  onSelect={() => {
                                    // form.setValue(`job_specific_location.${index}.job_location_province`, province.id)
                                    handleDistrictChange(index, district.id)
                                  }}
                                >
                                  {district.full_name}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      district.id === field.value ? 'opacity-100' : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                name={`job_specific_location.${index}.job_location_ward`}
                control={control}
                render={({ field }) => (
                  <FormItem className='flex flex-col mt-3 w-full'>
                    <FormLabel>Xã/Phường *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                          >
                            {field.value
                              ? (
                                  wards[
                                    parseInt(form.getValues(`job_specific_location.${index}.job_location_district`))
                                  ] || []
                                ).find((ward) => ward.id === field.value)?.full_name
                              : 'Chọn Tỉnh/Thành'}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[200px] p-0'>
                        <Command>
                          <CommandInput placeholder='Tìm kiếm xã/phường...' className='h-9' />
                          <CommandList>
                            <CommandEmpty>Không tìm thấy xã/phường nào.</CommandEmpty>
                            <CommandGroup>
                              {(
                                wards[
                                  parseInt(form.getValues(`job_specific_location.${index}.job_location_district`))
                                ] || []
                              ).map((ward) => (
                                <CommandItem
                                  value={ward.full_name}
                                  key={ward.id}
                                  onSelect={() => {
                                    handleWardChange(index, ward.id)
                                  }}
                                >
                                  {ward.full_name}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      ward.id === field.value ? 'opacity-100' : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                name={`job_specific_location.${index}.job_specific_address`}
                control={control}
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Địa chỉ cụ thể *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Địa chỉ cụ thể...' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {fields.length > 1 && (
                <span onClick={() => remove(index)} className='mt-10 cursor-pointer ml-2'>
                  <MdDeleteForever />
                </span>
              )}
              <span
                onClick={() => {
                  append({
                    job_location_province: '',
                    job_location_district: '',
                    job_location_ward: '',
                    job_specific_address: ''
                  })
                }}
                className='mt-10 cursor-pointer'
              >
                <IoMdAddCircle />
              </span>
            </div>
          ))}
        </div>

        <div>
          <Label>Mô tả công việc*</Label>
          <MdEditor
            value={job_description.text}
            style={{ height: '300px', width: '100%' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={({ html, text }) => onChangeMarkdown(text, html, 'job_description')}
          />
        </div>
        <div>
          <Label>Yêu cầu ứng viên*</Label>
          <MdEditor
            value={job_requirements.text}
            style={{ height: '300px', width: '100%' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={({ html, text }) => onChangeMarkdown(text, html, 'job_requirements')}
          />
        </div>
        <div>
          <Label>Quyền lợi của ứng viên*</Label>
          <MdEditor
            value={job_benefits.text}
            style={{ height: '300px', width: '100%' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={({ html, text }) => onChangeMarkdown(text, html, 'job_benefits')}
          />
        </div>
        <div>
          <Label>Yêu cầu thêm</Label>
          <MdEditor
            value={job_additional_requirements.text}
            style={{ height: '300px', width: '100%' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={({ html, text }) => onChangeMarkdown(text, html, 'job_additional_requirements')}
          />
        </div>
        <Label>Ngành nghề</Label>
        <Tag data={job_career} setData={setJob_career} tag='Thêm tag ngành nghề' className='w-full' type='profession' />
        <Label>Kỹ năng</Label>
        <Tag data={job_skills} setData={setJob_skills} tag='Thêm tag kỹ năng' className='w-full' type='skill' />
        <Label>Khu vực làm việc</Label>
        <Tag data={job_area} setData={setJob_area} tag='Thêm tag khu vực làm việc' className='w-full' type='area' />
        <Label className='opacity-65'>Những trường có dấu * là bắt buộc</Label>

        <Button type='submit' className='!mt-4 w-full' variant={'topcv'}>
          {id === 'add' ? 'Tạo job' : 'Chỉnh sửa job'}
        </Button>
      </form>
    </Form>
  )
}
