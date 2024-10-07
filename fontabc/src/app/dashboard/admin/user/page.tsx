import { Metadata } from 'next'
import { DataTableDemo } from './DataTable'

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'A task and issue tracker build using Tanstack Table.'
}

export default async function UserPage() {
  // const defaultLayout = [20, 32, 48]
  return (
    <>
      <div>
        <span className='font-bold text-2xl text-[#00b14f] pt-20'>Quản lý công ty</span>
      </div>
      <DataTableDemo />
    </>
  )
}
