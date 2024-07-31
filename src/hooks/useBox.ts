import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import { AxiosError } from 'axios'
import type { Box } from './useBoxList'

function useBox({
  id,
  identifier,
}: {
  id?: Box['id']
  identifier?: Box['identifier']
}) {
  const params = new URLSearchParams()
  if (typeof id === 'string') {
    params.append('id', id)
  }
  if (typeof identifier === 'string') {
    params.append('identifier', identifier)
  }

  const { data, error, isLoading } = useSWR<Box, AxiosError>(
    '/api/v1/box/get?' + params.toString(),
    fetcher,
  )

  return { data, isLoading, error }
}

export default useBox
