import useSWR from 'swr'
import { getFetcher } from '@/utils/fetcher'
import { AxiosError } from 'axios'
import useSecret from './useSecret'

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
  admin?: boolean
}

function useQuestionList(
  { boxId, isReplied }: Filter | undefined = {},
  { shouldFetch, admin }: Config = {},
) {
  const [secret] = admin ? useSecret() : [null]

  const { data, error, isLoading, mutate } = useSWR<Question[], AxiosError>(
    (typeof shouldFetch === 'boolean' ? shouldFetch : true)
      ? '/api/v1/question/list?' +
          new URLSearchParams({
            boxId: boxId ?? '',
            isReplied:
              typeof isReplied === 'boolean' ? isReplied.toString() : '',
          })
      : null,
    getFetcher(secret ? { secret } : undefined),
  )

  return { data, error, isLoading, mutate }
}

export default useQuestionList

export type { Question }
