import dayjs from 'dayjs';

const util = {
  currentTime: () => {
    return dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
  time: t => {
    return dayjs(t).format('YYYY-MM-DD HH:mm:ss')
  }
}

window.util = util
export default util