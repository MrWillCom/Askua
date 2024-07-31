import dynamic from 'next/dynamic'

export default function noSsr(component: any) {
  return dynamic(() => Promise.resolve(component), { ssr: false })
}
