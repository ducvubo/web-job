import { Transform, Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateIf,
  ValidateNested
} from 'class-validator'

class WageRange {
  @IsNotEmpty({ message: 'Mức lương tối thiểu không được để trống khi lựa chọn khoảng.' })
  @IsNumber({}, { message: 'Mức lương tối thiểu phải là số.' })
  min: number

  @IsNotEmpty({ message: 'Mức lương tối đa không được để trống khi lựa chọn khoảng.' })
  @IsNumber({}, { message: 'Mức lương tối đa phải là số.' })
  max: number
}

class JobWage {
  @IsNotEmpty({ message: 'Tuỳ chọn mức lương không được để trống.' })
  @IsString({ message: 'Tuỳ chọn mức lương phải là chuỗi.' })
  option: 'range' | 'down' | 'up' | 'negotiable'

  @ValidateIf((o) => o.option === 'range')
  @IsNotEmpty({ message: 'Khoảng lương không được để trống khi lựa chọn là khoảng.' })
  @ValidateNested()
  @Type(() => WageRange)
  range?: WageRange

  @ValidateIf((o) => o.option === 'down' || o.option === 'up')
  @IsNotEmpty({ message: 'Mức lương cụ thể không được để trống khi lựa chọn là dưới hoặc trên.' })
  @IsNumber({}, { message: 'Mức lương cụ thể phải là số.' })
  amount?: number
}

class Markdown {
  @IsNotEmpty({ message: 'Text Markdown không được để trống' })
  @IsString({ message: 'Text Markdown phải là chu��i' })
  text: string

  @IsNotEmpty({ message: 'HTML Markdown không được để trống' })
  @IsString({ message: 'HTML Markdown phải là chu��i' })
  html: string
}

enum JobExperience {
  'Không yêu cầu kinh nghiệm' = 'Không yêu cầu kinh nghiệm',
  'Dưới 1 năm kinh nghiệm' = 'Dưới 1 năm kinh nghiệm',
  'Dưới 1,5 năm kinh nghiệm' = 'Dưới 1,5 năm kinh nghiệm',
  'Dưới 2 năm kinh nghiệm' = 'Dưới 2 năm kinh nghiệm',
  'Dưới 2,5 năm kinh nghiệm' = 'Dưới 2,5 năm kinh nghiệm',
  'Dưới 3 năm kinh nghiệm' = 'Dưới 3 năm kinh nghiệm',
  'Dưới 3,5 năm kinh nghiệm' = 'Dưới 3,5 năm kinh nghiệm',
  'Dưới 4 năm kinh nghiệm' = 'Dưới 4 năm kinh nghiệm',
  'Dưới 5 năm kinh nghiệm' = 'Dưới 5 năm kinh nghiệm',
  'Dưới 5,5 năm kinh nghiệm' = 'Dưới 5,5 năm kinh nghiệm',
  'Dưới 6 năm kinh nghiệm' = 'Dưới 6 năm kinh nghiệm',
  'Dưới 6,5 năm kinh nghiệm' = 'Dưới 6,5 năm kinh nghiệm',
  'Dưới 7 năm kinh nghiệm' = 'Dưới 7 năm kinh nghiệm',
  'Dưới 7,5 năm kinh nghiệm' = 'Dưới 7,5 năm kinh nghiệm',
  'Dưới 8 năm kinh nghiệm' = 'Dưới 8 năm kinh nghiệm',
  'Dưới 8,5 năm kinh nghiệm' = 'Dưới 8,5 năm kinh nghiệm',
  'Dưới 9 năm kinh nghiệm' = 'Dưới 9 năm kinh nghiệm',
  'Dưới 9,5 năm kinh nghiệm' = 'Dưới 9,5 năm kinh nghiệm',
  'Dưới 10 năm kinh nghiệm' = 'Dưới 10 năm kinh nghiệm',
  'Trên 10 năm kinh nghiệm' = 'Trên 10 năm kinh nghiệm',
  'Trên 9 năm kinh nghiệm' = 'Trên 9 năm kinh nghiệm',
  'Trên 8 năm kinh nghiệm' = 'Trên 8 năm kinh nghiệm',
  'Trên 7 năm kinh nghiệm' = 'Trên 7 năm kinh nghiệm',
  'Trên 6 năm kinh nghiệm' = 'Trên 6 năm kinh nghiệm',
  'Trên 5 năm kinh nghiệm' = 'Trên 5 năm kinh nghiệm',
  'Trên 4 năm kinh nghiệm' = 'Trên 4 năm kinh nghiệm',
  'Trên 3 năm kinh nghiệm' = 'Trên 3 năm kinh nghiệm',
  'Trên 2 năm kinh nghiệm' = 'Trên 2 năm kinh nghiệm',
  'Trên 1 năm kinh nghiệm' = 'Trên 1 năm kinh nghiệm',
  'Trên 9,5 năm kinh nghiệm' = 'Trên 9,5 năm kinh nghiệm',
  'Trên 8,5 năm kinh nghiệm' = 'Trên 8,5 năm kinh nghiệm',
  'Trên 7,5 năm kinh nghiệm' = 'Trên 7,5 năm kinh nghiệm',
  'Trên 6,5 năm kinh nghiệm' = 'Trên 6,5 năm kinh nghiệm',
  'Trên 5,5 năm kinh nghiệm' = 'Trên 5,5 năm kinh nghiệm',
  'Trên 4,5 năm kinh nghiệm' = 'Trên 4,5 năm kinh nghiệm',
  'Trên 3,5 năm kinh nghiệm' = 'Trên 3,5 năm kinh nghiệm',
  'Trên 2,5 năm kinh nghiệm' = 'Trên 2,5 năm kinh nghiệm',
  'Trên 1,5 năm kinh nghiệm' = 'Trên 1,5 năm kinh nghiệm',
  'Từ 0 - 1 năm kinh nghiệm' = 'Từ 0 - 1 năm kinh nghiệm',
  'Từ 1 - 2 năm kinh nghiệm' = 'Từ 1 - 2 năm kinh nghiệm',
  'Từ 2 - 3 năm kinh nghiệm' = 'Từ 2 - 3 năm kinh nghiệm',
  'Từ 3 - 4 năm kinh nghiệm' = 'Từ 3 - 4 năm kinh nghiệm',
  'Từ 4 - 5 năm kinh nghiệm' = 'Từ 4 - 5 năm kinh nghiệm',
  'Từ 5 - 6 năm kinh nghiệm' = 'Từ 5 - 6 năm kinh nghiệm',
  'Từ 6 - 7 năm kinh nghiệm' = 'Từ 6 - 7 năm kinh nghiệm',
  'Từ 7 - 8 năm kinh nghiệm' = 'Từ 7 - 8 năm kinh nghiệm',
  'Từ 8 - 9 năm kinh nghiệm' = 'Từ 8 - 9 năm kinh nghiệm',
  'Từ 9 - 10 năm kinh nghiệm' = 'Từ 9 - 10 năm kinh nghiệm'
}

class Location {
  @IsNotEmpty({ message: 'ID không được để trống' })
  @IsString({ message: 'ID phải là một chuỗi' })
  id: string

  @IsNotEmpty({ message: 'Tên không được để trống' })
  @IsString({ message: 'Tên phải là một chuỗi' })
  full_name: string
}

class Tag {
  @IsNotEmpty({ message: 'ID không được để trống' })
  @IsString({ message: 'ID phải là một chuỗi' })
  _id: string

  @IsNotEmpty({ message: 'Tên không được để trống' })
  @IsString({ message: 'Tên phải là một chuỗi' })
  name: string
}

class JobSpecificLocation {
  @ValidateNested()
  @Type(() => Location)
  job_location_province: Location

  @ValidateNested()
  @Type(() => Location)
  job_location_district: Location

  @ValidateNested()
  @Type(() => Location)
  job_location_ward: Location

  @IsNotEmpty({ message: 'Địa chỉ cụ thể không được để trống' })
  @IsString({ message: 'Địa chỉ cụ thể phải là một chuỗi' })
  job_specific_address: string
}

export class CreateJobDto {
  @IsNotEmpty({ message: 'Tên công việc không được để trống' })
  @IsString({ message: 'Tên công việc phải là chuỗi' })
  job_name: string

  @IsNotEmpty({ message: 'Mức lương không được để trống.' })
  @ValidateNested()
  @Type(() => JobWage)
  job_wage: JobWage

  @IsNotEmpty({ message: 'Địa chỉ ngắn gọn không được để trống' })
  @IsString({ message: 'Địa chỉ ngắn gọn là chuỗi' })
  job_address_summary: string

  @IsNotEmpty({ message: 'Yêu cầu kinh nghiệm không được để trống' })
  @IsString({ message: 'Yêu cầu kinh nghiệm phải là chuỗi' })
  @IsEnum(JobExperience, { message: 'Yêu cầu kinh nghiệm không hợp lệ' })
  job_exp: JobExperience

  @IsNotEmpty({ message: 'Cấp bậc không được để trống' })
  @IsString({ message: 'Cấp bậc phải là chuỗi' })
  job_rank: string

  @IsNotEmpty({ message: 'Số lượng tuyển không được để trống' })
  @IsNumber({}, { message: 'Số lượng tuyển phải là số' })
  job_quantity: number

  @IsNotEmpty({ message: 'Hình thức làm việc không được để trống' })
  @IsString({ message: 'Hình thức làm việc phải là chu��i' })
  job_working_type: string

  @IsNotEmpty({ message: 'Giới tính không được để trống' })
  @IsString({ message: 'Giới tính phải là chu��i' })
  job_gender: string

  @IsNotEmpty({ message: 'Ngày bắt đầu nộp hồ sơ không được để trống' })
  @IsDate({ message: 'Ngày bắt đầu nộp hồ sơ phải là ngày, tháng, năm' })
  @Transform(({ value }) => new Date(value))
  job_start_date: Date

  @IsNotEmpty({ message: 'Ngày kết thúc nộp hồ sơ không được để trống' })
  @IsDate({ message: 'Ngày kết thúc nộp hồ sơ phải là ngày, tháng, năm' })
  @Transform(({ value }) => new Date(value))
  job_end_date: Date

  @IsNotEmpty({ message: 'Ngành nghề không được để trống' })
  @IsArray({ message: 'Ngành nghề phải là mảng' })
  job_career: Tag[]

  @IsNotEmpty({ message: 'Kỹ năng không được để trống' })
  @IsArray({ message: 'Kỹ năng phải là mảng' })
  job_skills: Tag[]

  @IsNotEmpty({ message: 'Khu vực làm việc không được để trống' })
  @IsArray({ message: 'Khu vực làm việc phải là mảng' })
  job_area: Tag[]

  @IsNotEmpty({ message: 'Mô tả công việc không được để trống' })
  @IsObject({ message: 'Mô tả công việc phải là object' })
  @ValidateNested()
  @Type(() => Markdown)
  job_description: Markdown

  @IsNotEmpty({ message: 'Yêu cầu ứng viên không được để trống' })
  @IsObject({ message: 'Yêu cầu ứng viên phải là object' })
  @ValidateNested()
  @Type(() => Markdown)
  job_requirements: Markdown

  @IsNotEmpty({ message: 'Quyền lợi ứng viên không được để trống' })
  @IsObject({ message: 'Quyền lợi ứng viên phải là object' })
  @ValidateNested()
  @Type(() => Markdown)
  job_benefits: Markdown

  @IsObject({ message: 'Yêu cầu thêm phải là object' })
  @ValidateNested()
  job_additional_requirements: Markdown

  @ValidateNested({ each: true })
  @Type(() => JobSpecificLocation)
  @IsNotEmpty({ message: 'Danh sách địa điểm không được để trống' })
  @ArrayMinSize(1, { message: 'Danh sách địa điểm phải có ít nhất một địa điểm' })
  job_specific_location: JobSpecificLocation[]

  @IsNotEmpty({ message: 'Trạng thái publish không được để trống' })
  @IsBoolean({ message: 'Trạng thái publish phải là boolean' })
  job_isPublished: boolean

  @IsNotEmpty({ message: 'Trạng thái nháp không được để trống' })
  @IsBoolean({ message: 'Trạng thái nháp phải là boolean' })
  job_isDraft: boolean
}
