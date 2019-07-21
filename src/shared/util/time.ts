import * as dayjs from 'dayjs'

export function getCurrentTime() {
  return dayjs().unix()
}
