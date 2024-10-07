import 'server-only'
import { cookies } from 'next/headers'

export function deleteCookie(key: string) {
  cookies().delete(key)
}
