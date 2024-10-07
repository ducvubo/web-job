import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/selectCustom'
export default function SelectAddress() {
  return (
    <Select>
      <SelectTrigger className='w-[180px] text-base bg-[#f3f5f7]'>
        <SelectValue placeholder='Chọn địa điểm' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='apple'>Tất cả địa điểm</SelectItem>
          <SelectItem value='apple'>Hồ Chí Minh</SelectItem>
          <SelectItem value='banana'>Hà Nội</SelectItem>
          <SelectItem value='blueberry'>Hải Phòng</SelectItem>
          <SelectItem value='grapes'>Đà Nẵng</SelectItem>
          <SelectItem value='pineapple'>Nghệ An</SelectItem>
          <SelectItem value='strawberry'>Thái Nguyên</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
