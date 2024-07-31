import useSWR from 'swr'
import { getFetcher } from '@/utils/fetcher'
import { AxiosError } from 'axios'
import useSecret from './useSecret'

interface Box {
  id: string
  identifier: string
  name: string
  createdAt: string
  updatedAt: string
  questions: { id: string }[]
  open: boolean
  public: boolean
  description?: string
}

function useBoxList(args?: { admin?: boolean }) {
  const [secret] = args?.admin ? useSecret() : [null]
  const { data, error, isLoading, mutate } = useSWR<Box[], AxiosError>(
    '/api/v1/box/list',
    getFetcher(secret ? { secret } : undefined),
  )

  return { data, error, isLoading, mutate }
}

export default useBoxList

export type { Box }
