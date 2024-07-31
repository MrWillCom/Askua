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
  public: boolean
}

interface Filter {
  boxId?: string
  isReplied?: boolean
}

interface Config {
  shouldFetch?: boolean
}

function useQuestionList(
  { boxId, isReplied }: Filter | undefined = {},
  { shouldFetch }: Config = {},
) {
  const { data, error, isLoading, mutate } = useSWR<Question[], AxiosError>(
    (typeof shouldFetch === 'boolean' ? shouldFetch : true)
      ? '/api/v1/question/list?' +
          new URLSearchParams({
            boxId: boxId ?? '',
            isReplied:
              typeof isReplied === 'boolean' ? isReplied.toString() : '',
          })
      : null,
    fetcher,
  )

  return { data, error, isLoading, mutate }
}

export default useQuestionList

export type { Question }
