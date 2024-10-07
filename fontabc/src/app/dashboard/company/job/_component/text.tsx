'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input, InputBanner } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { JobBody, JobBodyTest, JobBodyTestType, JobBodyType } from '@/app/schemaValidations/Job.schema'
import React from 'react'
import 'react-markdown-editor-lite/lib/index.css'
import { MdDeleteForever } from 'react-icons/md'
import { IoMdAddCircle } from 'react-icons/io'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { cn } from '@/lib/utils'

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

export default function FormAddOrEditJobTest({ inforJob, id }: { inforJob: any; id: string }) {
  const [provinces, setProvinces] = useState<IAddress[]>([])
  const [districts, setDistricts] = useState<Record<number, IAddress[]>>({})
  const [wards, setWards] = useState<Record<number, IAddress[]>>({})

  const form = useForm<JobBodyTestType>({
    resolver: zodResolver(JobBodyTest),
    defaultValues: {
      job_specific_location: [
        { job_location_province: '', job_location_district: '', job_location_ward: '', job_specific_address: '' }
      ]
    },
    mode: 'onChange'
  })

  const { reset, control, handleSubmit, setValue, getValues } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'job_specific_location'
  })

  useEffect(() => {
    const handleAddressInitialization = async () => {
      if (inforJob && id !== 'add') {
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
      }
    }

    handleAddressInitialization()
  }, [inforJob, reset, id])

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

  async function onSubmit(values: JobBodyTestType) {
    const transformedValues = values.job_specific_location.map((location) => {
      const province = provinces.find((p) => p.id === location.job_location_province) || { id: '', full_name: '' }
      const districtList = districts[parseInt(location.job_location_province)] || []
      const district = districtList.find((d) => d.id === location.job_location_district) || { id: '', full_name: '' }
      const wardList = wards[parseInt(location.job_location_district)] || []
      const ward = wardList.find((w) => w.id === location.job_location_ward) || { id: '', full_name: '' }

      return {
        job_location_province: province,
        job_location_district: district,
        job_location_ward: ward,
        job_specific_address: location.job_specific_address
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-2 flex-shrink-0 w-full pb-10'>
        <div className='w-full'>
          {fields.map((item, index) => (
            <div key={index} className='flex gap-4'>
              {/* <Controller
                name={`job_specific_location.${index}.job_location_province`}
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tỉnh/Thành *</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => handleProvinceChange(index, value)}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select Tỉnh/Thành' />
                        </SelectTrigger>
                        <SelectContent>
                          {provinces.map((province) => (
                            <SelectItem key={province.id} value={province.id}>
                              {province.full_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <Controller
                name={`job_specific_location.${index}.job_location_province`}
                control={control}
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Tỉnh/Thành *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
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
                                  value={province.id}
                                  key={province.id}
                                  onSelect={() => {
                                    // form.setValue(`job_specific_location.${index}.job_location_province`, province.id)
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
                  <FormItem>
                    <FormLabel>Quận/Huyện *</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => handleDistrictChange(index, value)}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select Quận/Huyện' />
                        </SelectTrigger>
                        <SelectContent>
                          {(
                            districts[
                              parseInt(form.getValues(`job_specific_location.${index}.job_location_province`))
                            ] || []
                          ).map((district) => (
                            <SelectItem key={district.id} value={district.id}>
                              {district.full_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                name={`job_specific_location.${index}.job_location_ward`}
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phường/Xã *</FormLabel>
                    <FormControl>
                      <Select {...field} onValueChange={(value) => handleWardChange(index, value)} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Phường/Xã' />
                        </SelectTrigger>
                        <SelectContent>
                          {(
                            wards[parseInt(form.getValues(`job_specific_location.${index}.job_location_district`))] ||
                            []
                          ).map((ward) => (
                            <SelectItem key={ward.id} value={ward.id}>
                              {ward.full_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                name={`job_specific_location.${index}.job_specific_address`}
                control={control}
                render={({ field }) => (
                  <FormItem>
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

        <Button type='submit' className='!mt-4 w-full' variant={'topcv'}>
          Thêm
        </Button>
      </form>
    </Form>
  )
}
