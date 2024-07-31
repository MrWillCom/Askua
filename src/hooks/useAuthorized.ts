import { useLocalStorage } from '@uidotdev/usehooks'

function useAuthorized() {
  return useLocalStorage<boolean>('authorized', false)
}

export default useAuthorized
