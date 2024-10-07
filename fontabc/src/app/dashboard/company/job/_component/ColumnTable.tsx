import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { DataTableColumnHeader } from '../../../../components/admin/DataTableColumnHeader'
import Link from 'next/link'
import { IJob } from '../job.interface'
import DeleteJob from './DeleteJob'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { updatePublishOrDraft } from '../api'
export const columns: ColumnDef<IJob>[] = [
  {
    accessorKey: 'job_name',
    header: 'Company Name'
  },
  // {
  //   accessorKey: 'job_wage',
  //   header: 'Lương'
  // },
  {
    accessorKey: 'job_quantity',
    header: 'Số lượng'
  },
  {
    accessorKey: 'job_exp',
    header: 'Kinh nghiệm'
  },
  {
    accessorKey: 'job_rank',
    header: 'Chức vụ'
  },
  {
    accessorKey: 'job_quantity',
    header: 'Số lượng tuyển'
  },
  {
    accessorKey: 'job_working_type',
    header: 'Hình thức làm việc'
  },
  {
    accessorKey: 'job_isPublished',
    header: 'Publics',
    cell: ({ row }) => {
      const handleOnChange = async (value: string) => {
        const res = await updatePublishOrDraft({
          status: value === 'True' ? true : false,
          type: 'publish',
          _id: row.original._id
        })
      }
      return (
        <Select onValueChange={handleOnChange}>
          <SelectTrigger className='w-[70px] h-7'>
            <SelectValue placeholder={row.original.job_isPublished ? 'Yes' : 'No'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='True'>Yes</SelectItem>
              <SelectItem value='False'>No</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )
    }
  },
  {
    accessorKey: 'job_isDraft',
    header: 'Drafts',
    cell: ({ row }) => {
      const handleOnChange = async (value: string) => {
        const res = await updatePublishOrDraft({
          status: value === 'True' ? true : false,
          type: 'draft',
          _id: row.original._id
        })
      }
      return (
        <Select onValueChange={handleOnChange}>
          <SelectTrigger className='w-[70px] h-7'>
            <SelectValue placeholder={row.original.job_isDraft ? 'Yes' : 'No'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='True'>Yes</SelectItem>
              <SelectItem value='False'>No</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )
    }
  },

  // {
  //   accessorKey: 'company_code_fiscal',
  //   header: ({ column }) => {
  //     return (
  //       <DataTableColumnHeader
  //         column={column}
  //         title='Mã số thuế'
  //         className='overflow-hidden text-ellipsis whitespace-nowrap'
  //       />
  //     )
  //   },
  //   cell: ({ row }) => (
  //     <div className=' overflow-hidden text-ellipsis whitespace-nowrap'>{row.getValue('company_code_fiscal')}</div>
  //   )
  // },

  {
    id: 'actions',
    cell: ({ row }) => {
      const Job: IJob = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-3 w-3 p-0'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>
              <Link href={`${process.env.NEXT_PUBLIC_HOST_FRONTEND}/dashboard/company/job/${Job.job_slug}`}>Sửa</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>{typeof window !== undefined && <DeleteJob job={Job} />}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
