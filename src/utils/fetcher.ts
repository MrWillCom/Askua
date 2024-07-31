import axios from 'axios'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const getFetcher = (args?: { secret?: string }) => {
  return (url: string) =>
    axios
      .get(
        url,
        args?.secret
          ? { headers: { Authorization: 'Bearer ' + args.secret } }
          : undefined,
      )
      .then(res => res.data)
}

export default fetcher
export { fetcher, getFetcher }
