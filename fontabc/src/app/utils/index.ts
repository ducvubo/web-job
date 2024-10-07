import { sign } from 'crypto'
import md5 from 'md5'
import { redirect } from 'next/navigation'
import { AES } from 'crypto-js'

const getRandomNonce = (num: number) => {
  return Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, num - 1))
}

const keyToken = process.env.NEXT_PUBLIC_KEY_SECRET_API_ENDPOINT
const versionToken = 'v1'
export function genSignEndPoint() {
  const headers: any = {}
  const stime = Date.now()
  const nonce = getRandomNonce(20).toString()

  headers.stime = stime
  headers.nonce = nonce

  const sortKeys: string[] = []
  for (const key in headers) {
    if (key !== 'sign') {
      sortKeys.push(key)
    }
  }
  sortKeys.sort()
  let headersString = ''
  sortKeys.forEach((key) => {
    headersString += key + headers[key]
  })

  const sign = md5(headersString + keyToken + versionToken).toString()

  return {
    sign: sign,
    version: versionToken,
    nonce: nonce,
    stime: stime.toString()
  }
}

export function hashPayLoad<T>(payload: T) {
  const { sign, stime, version, nonce } = genSignEndPoint()
  const dataHash = AES.encrypt(JSON.stringify(payload), `${sign}${nonce}${keyToken}`).toString()
  return {
    sign,
    version,
    nonce,
    stime,
    dataHash: {
      data: dataHash
    }
  }
}

interface IInforLocation {
  id: string
  full_name: string
}

interface IJobLocation {
  job_location_province: IInforLocation
  job_location_district: IInforLocation
  job_location_ward: IInforLocation
  job_specific_address: string
}

export function getProvinceSummary(locations: IJobLocation[]) {
  const provinces = locations.map((location) => location.job_location_province.full_name)

  // Tạo danh sách các tỉnh duy nhất mà không sử dụng Set
  const uniqueProvinces: string[] = []
  provinces.forEach((province) => {
    if (!uniqueProvinces.includes(province)) {
      uniqueProvinces.push(province)
    }
  })

  // Format tên tỉnh, loại bỏ các tiền tố "Thành phố" hoặc "Tỉnh"
  const formattedProvinces = uniqueProvinces.map((province) => {
    if (province.startsWith('Thành phố ')) {
      return province.replace('Thành phố ', '')
    } else if (province.startsWith('Tỉnh ')) {
      return province.replace('Tỉnh ', '')
    } else {
      return province
    }
  })

  if (formattedProvinces.length === 1) {
    return formattedProvinces[0]
  } else if (formattedProvinces.length === 2) {
    return formattedProvinces.join(' và ')
  } else {
    const firstProvince = formattedProvinces[0]
    const otherCount = formattedProvinces.length - 1
    return `${firstProvince} & ${otherCount} nơi khác`
  }
}
