import axios from 'axios'

export const apiServer = axios.create({
  baseURL: process.env.FROM_SERVER_BASE_URL,
  // baseURL: process.env.FROM_SERVER_BASE_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
})
