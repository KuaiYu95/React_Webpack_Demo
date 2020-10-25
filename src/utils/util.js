import dayjs from 'dayjs';

const util = {
  currentTime: () => {
    return dayjs().format('YYYY年MM月DD日 HH:mm:ss')
  },
  time: (t, s = 'YYYY-MM-DD HH:mm:ss') => {
    return dayjs(t).format(s)
  },
  query: () => {
    const queryString = window.location.search.slice(1)
    const queryUrl = {}
    if (queryString.includes('=')) {
      queryString.split('&').forEach(it => {
        const left = it.split('=')[0]
        const right = it.split('=')[1]
        queryUrl[left] = right
      })
    }
    return queryUrl
  },
  showToast: content => {
    var div = document.querySelector('.toast')
    div.innerHTML = content
    div.classList.add('show-toast')
    setTimeout(() => {
      div.classList.remove('show-toast')
    }, 2000);
  },
  download: (title, text) => {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/markdown;charset=utf-8,${encodeURIComponent(text)}`);
    element.setAttribute('download', title + '.md');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  },
}

window.util = util
export default util