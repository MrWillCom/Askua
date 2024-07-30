import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import { AxiosError } from 'axios'

interface Box {
  id: string
  identifier: string
  name: string
  createdAt: string
  updatedAt: string
  questions: { id: string }[]
}

function useBoxList() {
  const { data, error, isLoading } = useSWR<Box[], AxiosError>(
    '/api/v1/box/list',
    fetcher,
  )

  return { data, isLoading, error }
}

export default useBoxList

export type { Box }
