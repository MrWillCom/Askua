'use client'

import styles from './page.module.scss'

import Container from '@/components/Container'
import { Heading } from '@radix-ui/themes'
import Flow from '@/components/Flow'
import BoxList from '@/components/BoxList'

export default function Home() {
  return (
    <Container>
      <Flow>
        <Heading as="h1">Boxes</Heading>
        <BoxList />
      </Flow>
    </Container>
  )
}
