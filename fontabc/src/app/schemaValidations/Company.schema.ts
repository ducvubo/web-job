import { z } from 'zod'
import { metadata } from '../layout'
import { add } from 'date-fns'
import { Value } from '@radix-ui/react-select'

export const CompanyBody = z
  .object({
    company_email: z.string({ message: 'Email phải là dạng chuỗi' }).email({ message: 'Email không hợp lệ' }),
    company_phone: z
      .string({ message: 'Số điện thoại phải là dạng chuỗi số' })
      .min(10, { message: 'Số điện thoại tối thiểu 10 kí tự' }),
    company_password: z
      .string({ message: 'Password có dạng chuỗi' })
      .min(8, { message: 'Password tối thiểu 1o kí tự' })
      .max(100, { message: 'Password tối đa 100 kí tự' }),
    company_name: z
      .string({ message: 'Tên công ty có dạng chuỗi' })
      .min(5, { message: 'Tên công ty tối thiểu 5 kí tự' })
      .max(1000, { message: 'Tên công ty tối đa 1000 kí tự' }),
    company_avatar: z.string({ message: 'Avatar có dạng chuỗi' }),
    company_banner: z.string({ message: 'Banner có dạng chuỗi' }),
    company_description: z
      .string({ message: 'Mô tả công ty có dạng chuỗi' })
      .min(10, { message: 'Mô tả công ty tối thiểu 10 kí tự' })
      .max(10000, { message: 'Mô ta công ty tối đa 10000 kí tự' }),
    company_website: z.string({ message: 'Website có dạng chuỗi' }).optional(),
    company_address: z
      .array(
        z.object({
          company_address_province: z
            .string({ message: 'Tỉnh/Thành phố phải là dạng chuỗi' })
            .nonempty({ message: 'Tỉnh/Thành phố không được để trống' }),
          company_address_district: z
            .string({ message: 'Quận/Huyện phải là dạng chuỗi' })
            .nonempty({ message: 'Quận/Huyện không được để trống' }),
          company_address_ward: z
            .string({ message: 'Xã/Phường phải là dạng chuỗi' })
            .nonempty({ message: 'Xã/Phường không được để trống' }),
          company_address_specific: z
            .string({ message: 'Địa chỉ cụ thể phải là dạng chuỗi' })
            .nonempty({ message: 'Địa chỉ cụ thể không được để trống' })
        })
      )
      .nonempty({ message: 'Phải có ít nhất một địa chỉ cụ thể' }),
    company_code_fiscal: z
      .string({ message: 'Mã số thuế có dạng số' })
      .min(6, { message: 'Mã số thuế có tối thiểu 6 số' })
      .max(10, { message: 'Mã số thuế có tối đa 10 số' })
      .regex(/^\d+$/, { message: 'Mã số thuế có dạng số' })
      .optional(),
    company_business_field: z
      .string({ message: 'Lĩnh vực kinh doanh có dạng chuỗi' })
      .min(5, { message: 'Lĩnh vực kinh doanh có tối thiểu 5 kí tự' })
      .max(100, { message: 'Lĩnh vực kinh doanh có tối đa 100 kí tự' }),
    company_employee_total: z
      .string({ message: 'Tổng số công nhân viên có dạng chuỗi' })
      .min(10, { message: 'Tổng số nhân viên có tối thiểu 10 kí tự' })
      .max(100, { message: 'Tông số nhân viên có tối đa 100 kí tự' }),
    company_recruitment_status: z.string({ message: 'Trạng thái tuyển dụng có dạng chuỗi' }).optional()
  })
  .strict()

export const AddCompanyRes = z.object({
  statusCode: z.number(),
  message: z.string(),
  metadata: z.object({
    _id: z.string(),
    createdAt: z.date()
  }),
  tacgia: z.string()
})

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string()
})

export const LoginCompanyBody = z.object({
  company_email: z.string({ message: 'Email phải là dạng chuỗi' }),
  company_password: z
    .string({ message: 'Password có dạng chuỗi' })
    .min(8, { message: 'Password tối thiểu 8 kí tự' })
    .max(100, 'Mật khẩu không được quá 100 ký tự')
    .regex(/[a-z]/, 'Mật khẩu phải chứa ít nhất một chữ cái viết thường')
    .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa')
    .regex(/[0-9]/, 'Mật khẩu phải chứa ít nhất một chữ số')
    .regex(/[^a-zA-Z0-9]/, 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt')
})

export type Task = z.infer<typeof taskSchema>
export type AddCompanyBodyType = z.TypeOf<typeof CompanyBody>
export type AddCompanyResType = z.TypeOf<typeof AddCompanyRes>
export type LoginCompanyBodyType = z.TypeOf<typeof LoginCompanyBody>
