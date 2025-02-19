// 'use client'
// import React, { useEffect, useState } from 'react'
// import TestInput from './test'
// import { useSelector } from 'react-redux'
// import { RootState } from '../redux/store'
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
// export default function UserPage() {
//   const DataTest1 = ['PHP', 'Java', 'Angular', 'React', 'Python', 'Machine Learning', 'Visual', 'JavaScript', 'Go']
//   const [data, setData] = useState<string[]>(DataTest1)

//   const inforUser = useSelector((state: RootState) => state.inforUser)
//     ? useSelector((state: RootState) => state.inforUser)
//     : null

//   return (
//     <div>
//       <TestInput data={data} setData={setData} className='w-96' tag={'Thêm abc.........'} />
//       <Accordion type='single' collapsible className='w-full'>
//         <AccordionItem value='item-1'>
//           <AccordionTrigger>Is it accessible?</AccordionTrigger>
//           <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
//           <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
//           <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
//           <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </div>
//   )
// }

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from 'sonner'

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' }
] as const

const FormSchema = z.object({
  language: z.string({
    required_error: 'Please select a language.'
  })
})

export default function page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //       <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   )
    // })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='language'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                    >
                      {field.value
                        ? languages.find((language) => language.value === field.value)?.label
                        : 'Select language'}
                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  <Command>
                    <CommandInput placeholder='Search framework...' className='h-9' />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              // form.setValue('language', language.value)
                            }}
                          >
                            {language.label}
                            <CheckIcon
                              className={cn(
                                'ml-auto h-4 w-4',
                                language.value === field.value ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>This is the language that will be used in the dashboard.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
