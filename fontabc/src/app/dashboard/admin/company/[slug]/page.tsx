import GetDataEdit from '../_component/GetDataEdit'

export default function FormCompany({ params }: { params: { slug: string } }) {
  return (
    <>
      <span className='font-bold text-2xl text-[#00b14f] pt-20'>
        {params.slug === 'add' ? 'Thêm công ty' : 'Chỉnh sửa thông tin công ty'}
      </span>

      <GetDataEdit params={params} />
    </>
  )
}
