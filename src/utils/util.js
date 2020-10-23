import dayjs from 'dayjs';

const util = {
  currentTime: () => {
    return dayjs().format('YYYY-MM-DD hh:mm:ss')
  }
}

window.util = util
export default util