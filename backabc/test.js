// function generateSlug(input) {
//   // Chuyển chuỗi thành chữ thường và loại bỏ dấu tiếng Việt
//   const slug = input
//     .toLowerCase()
//     .normalize('NFD') // Chuẩn hóa chuỗi
//     .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
//     .replace(/[^a-z0-9\s-]/g, '') // Loại bỏ ký tự đặc biệt
//     .trim() // Loại bỏ khoảng trắng đầu cuối
//     .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang

//   const uuid = '3634635634634636'

//   return `${slug}-${uuid}.html`
// }
//
// // Ví dụ sử dụng
// const inputString = 'Công ty cổ phần 1 thành viên'
// const slug = generateSlug(inputString)
// console.log(slug)

const locations = [
  {
    job_location_province: {
      id: '79',
      full_name: 'Thành phố Hồ Chí Minh'
    },
    job_location_district: {
      id: '761',
      full_name: 'Quận 12'
    },
    job_location_ward: {
      id: '26770',
      full_name: 'Phường Hiệp Thành'
    },
    job_specific_address: 'zxczxczx'
  },
  {
    job_location_province: {
      id: '52',
      full_name: 'Tỉnh Bình Định'
    },
    job_location_district: {
      id: '546',
      full_name: 'Huyện Vĩnh Thạnh'
    },
    job_location_ward: {
      id: '21786',
      full_name: 'Thị trấn Vĩnh Thạnh'
    },
    job_specific_address: 'zxczxccds34543'
  },
  {
    job_location_province: {
      id: '27',
      full_name: 'Tỉnh Bắc Ninh'
    },
    job_location_district: {
      id: '260',
      full_name: 'Huyện Tiên Du'
    },
    job_location_ward: {
      id: '09349',
      full_name: 'Xã Phật Tích'
    },
    job_specific_address: 'kjljlkjl'
  },
  {
    job_location_province: {
      id: '24',
      full_name: 'Tỉnh Bắc Giang'
    },
    job_location_district: {
      id: '217',
      full_name: 'Huyện Lạng Giang'
    },
    job_location_ward: {
      id: '07408',
      full_name: 'Xã Dương Đức'
    },
    job_specific_address: 'sdfsdf'
  }
]

function getProvinceSummary(locations) {
  const provinces = locations.map((location) => location.job_location_province.full_name)
  const uniqueProvinces = [...new Set(provinces)]

  // Format province names, removing "Thành phố" or "Tỉnh" prefixes
  const formattedProvinces = uniqueProvinces.map((province) => {
    if (province.startsWith('Thành phố ')) {
      return province.replace('Thành phố ', '')
    } else if (province.startsWith('Tỉnh ')) {
      return province.replace('Tỉnh ', '')
    } else {
      return province
    }
  })

  if (formattedProvinces.length <= 2) {
    return formattedProvinces.join(' và ')
  } else {
    const firstProvince = formattedProvinces[0]
    const otherCount = formattedProvinces.length - 1
    return `${firstProvince} & ${otherCount} nơi khác`
  }
}

console.log(getProvinceSummary(locations))
