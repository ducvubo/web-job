'use client'
import { ColumnDef } from '@tanstack/react-table'
import { ICompanyList } from '../Company.interface'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { DataTableColumnHeader } from '../../../../components/admin/DataTableColumnHeader'
import Link from 'next/link'
import DeleteCompany from './DeleteCompany'
export const columns: ColumnDef<ICompanyList>[] = [
  {
    accessorKey: 'company_name',
    header: 'Company Name'
  },
  {
    accessorKey: 'company_email',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Email' />
    },
    cell: ({ row }) => (
      <div className='overflow-hidden text-ellipsis whitespace-nowrap'>{row.getValue('company_email')}</div>
    )
  },
  {
    accessorKey: 'company_phone',
    header: 'Phone'
  },
  {
    accessorKey: 'company_website',
    header: 'Website'
  },
  {
    accessorKey: 'company_code_fiscal',
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title='Mã số thuế'
          className='overflow-hidden text-ellipsis whitespace-nowrap'
        />
      )
    },
    cell: ({ row }) => (
      <div className=' overflow-hidden text-ellipsis whitespace-nowrap'>{row.getValue('company_code_fiscal')}</div>
    )
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const Company: ICompanyList = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-3 w-3 p-0'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>
              <Link href={`${process.env.NEXT_PUBLIC_HOST_FRONTEND}/dashboard/admin/company/${Company.company_slug}`}>
                Sửa
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              {typeof window !== undefined && <DeleteCompany company={Company} />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
