import { AxiosResponse } from 'axios'
import { apiClient } from './utils/apiClient'

interface IProps {
  url: string
  params: object
}

export async function fetchWithParams(props: IProps) {
  // const delay = Math.random() * 2000
  // await new Promise((r) => setTimeout(r, delay))
  const response = await apiClient.get(props.url, {
    params: {
      ...props.params,
    },
  })

  return response.data
}
