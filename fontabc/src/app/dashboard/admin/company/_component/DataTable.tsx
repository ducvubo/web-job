'use client'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { Input, InputBanner } from '@/components/ui/input'
import { FormAddCompany } from './AddOrEditCompany'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
}

export function DataTable<TData, TValue>({ columns, data, isLoading }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })
  return (
    <div className='h-full '>
      {/* <DataTableViewOptions table={table} /> */}
      {/* <DataTableToolbar table={table} /> */}
      <div className='flex items-center py-2'>
        <Input
          placeholder='Filter emails...'
          value={(table.getColumn('company_email')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('company_email')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
        <Button variant='topcv'>
          <Link href={'/dashboard/admin/company/add'}>Thêm công ty</Link>
        </Button>
        {/* <InputBanner /> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Chọn cột
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='flex flex-col'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column, index) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='overflow-x-auto rounded-md border w-full !h-[570px]'>
        <Table className='min-w-full table-fixed'>
          <TableHeader className='relative'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className='overflow-hidden text-ellipsis whitespace-nowrap sticky top-0 h-10'
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='overflow-hidden text-ellipsis whitespace-nowrap'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className='flex flex-col'>
                {!isLoading ? (
                  <TableCell colSpan={columns.length} className='h-24 w-[1000px] flex justify-center items-center'>
                    Chưa có dữ công ty vui lòng thêm công ty...
                  </TableCell>
                ) : (
                  Array.from({ length: 10 }).map((_, index) => (
                    <TableCell colSpan={columns.length} className=' text-center'>
                      <Skeleton className='w-[1000px] h-[20px]  rounded-full' />
                    </TableCell>
                  ))
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
