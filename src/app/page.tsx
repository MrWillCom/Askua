'use client'

import styles from './page.module.scss'

import Container from '@/components/Container'
import { Heading } from '@radix-ui/themes'
import Flow from '@/components/Flow'
import BoxList from '@/components/BoxList'
import useBoxList from '@/hooks/useBoxList'
import AutoSpinnerView from '@/components/AutoSpinnerView'

export default function Home() {
  const { data, error, isLoading } = useBoxList()

  return (
    <Container>
      <Flow>
        <Heading as="h1">Boxes</Heading>
        <AutoSpinnerView error={error} isLoading={isLoading}>
          <BoxList data={data!} />
        </AutoSpinnerView>
      </Flow>
    </Container>
  )
}
