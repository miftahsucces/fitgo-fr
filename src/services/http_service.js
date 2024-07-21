import axios from 'axios'

export function http() {
  return axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    },
  })
}

export function httpFile() {
  return axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    },
  })
}
