'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginCompanyBody, LoginCompanyBodyType } from '@/app/schemaValidations/Company.schema'
import { genSignEndPoint } from '@/app/utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { inforCompanyState, startAppCompany } from '@/app/auth/cookie/inforCompany.slice'
import { useDispatch } from 'react-redux'
import { loginCompany } from '@/app/actions/auth'
import { useLoading } from '@/context/LoadingContext'
export function LoginForm() {
  const { setLoading } = useLoading()
  const router = useRouter()
  const dispatch = useDispatch()
  const form = useForm<LoginCompanyBodyType>({
    resolver: zodResolver(LoginCompanyBody),
    defaultValues: {
      company_email: '',
      company_password: ''
    },
    mode: 'onChange'
  })

  const loginSuccessCompany = (inforCompany: inforCompanyState) => {
    dispatch(startAppCompany(inforCompany))
  }

  async function onSubmit(values: LoginCompanyBodyType) {
    setLoading(true)

    const resLogin = await loginCompany(values)
    
    if (resLogin?.code === 1) {
      toast('Đăng nhập thành công', {
        action: {
          label: 'Tắt',
          onClick: () => null
        }
      })
      router.push('/dashboard/company/job')
      loginSuccessCompany(resLogin.data)
      setLoading(false)
    } else if (resLogin?.code === -1 || resLogin?.code === -2) {
      setLoading(false)
      toast('Email hoặc mật khẩu không đúng', {
        action: {
          label: 'Tắt',
          onClick: () => null
        }
      })
    } else {
      setLoading(false)
      toast('Đã có lỗi xảy ra vui lòng thử lại', {
        action: {
          label: 'Tắt',
          onClick: () => null
        }
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
        <FormField
          control={form.control}
          name='company_email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='company_password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='Password...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' variant={'topcv'} disabled={!form.formState.isValid} className='w-full'>
          Đăng nhập
        </Button>
      </form>
    </Form>
  )
}
