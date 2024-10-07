import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import slugify from 'slugify'

export const getInfoData = ({ fileds = [], object = {} }) => {
  return _.pick(object, fileds)
}

export const generateSlug = (input: string): string => {
  // Chuyển chuỗi thành chữ thường và loại bỏ dấu tiếng Việt
  const slug = slugify(input, {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: false, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: 'vi', // language code of the locale to use
    trim: true // trim leading and trailing replacement chars, defaults to `true`
  })

  const uuid = uuidv4()

  return `${slug}-${uuid}.html`
}
