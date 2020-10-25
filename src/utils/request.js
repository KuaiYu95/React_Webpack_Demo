import axios from 'axios';

const domain = 'http://www.kuaiyu.site'
// const domain = 'http://localhost:8080'
export default function request(url = '', requestInfo = {}) {
  const {
    method = 'GET', data = {}
  } = requestInfo

  if (method === 'GET') {
    return axios.get(domain + url)
  } else {
    return axios.post(domain + url, data)
  }
}