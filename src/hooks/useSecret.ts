import { useLocalStorage } from '@uidotdev/usehooks'

function useSecret() {
  return useLocalStorage<string | null>('secret', null)
}

export default useSecret
