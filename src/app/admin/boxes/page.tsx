'use client'

import styles from './page.module.scss'

import Container from '@/components/Container'
import Flow from '@/components/Flow'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Heading } from '@radix-ui/themes'
import AuthorizedView from '@/components/AuthorizedView'
import BoxList from '@/components/BoxList'

export default function Page() {
  return (
    <Container>
      <Flow>
        <Heading as="h1">Manage Boxes</Heading>
        <AuthorizedView>
          <Button variant="soft">
            <PlusIcon /> Create
          </Button>
          <BoxList admin />
        </AuthorizedView>
      </Flow>
    </Container>
  )
}
