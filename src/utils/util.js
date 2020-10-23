import dayjs from 'dayjs';

const util = {
  currentTime: () => {
    return dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
  time: (t, s = 'YYYY-MM-DD HH:mm:ss') => {
    return dayjs(t).format(s)
  }
}

window.util = util
export default util