import axios from 'axios'

export const apiServer = axios.create({
  baseURL: process.env.API_SERVER,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
})
