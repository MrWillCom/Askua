import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import { AxiosError } from 'axios'

interface Question {
  id: string
  content: string
  reply?: string
  repliedAt?: string
  boxId: string
  createdAt: string
  updatedAt: string
}

function useQuestionList(boxId: string | null, shouldFetch: boolean) {
  const { data, error, isLoading, mutate } = useSWR<Question[], AxiosError>(
    shouldFetch ? '/api/v1/question/list?boxId=' + boxId : null,
    fetcher,
  )

  return { data, error, isLoading, mutate }
}

export default useQuestionList

export type { Question }
