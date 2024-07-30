'use client'

import styles from './page.module.scss'

import axios from 'axios'
import Container from '@/components/Container'
import useSWR from 'swr'
import Center from '@/components/Center'
import { Card, Flex, Spinner, Text, Link } from '@radix-ui/themes'
import NextLink from 'next/link'
import moment from 'moment'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

interface Box {
  id: string
  identifier: string
  name: string
  createdAt: string
  updatedAt: string
  questions: { id: string }[]
}

export default function Home() {
  const {
    data,
    error,
    isLoading,
  }: { data: Box[]; error: Error | undefined; isLoading: boolean } = useSWR(
    '/api/v1/box/list',
    fetcher,
  )

  return (
    <Container>
      {error ? (
        <Center>{error.message}</Center>
      ) : isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        data.map(b => (
          <Card key={b.id} my="4">
            <Flex justify="between" align="center">
              <Link size="4" asChild>
                <NextLink href={'/box/' + b.identifier}>{b.name}</NextLink>
              </Link>
              <Text color="gray" size="2">
                {b.questions.length === 0 ? 'No' : b.questions.length} question
                {b.questions.length === 1 ? '' : 's'}
              </Text>
            </Flex>
          </Card>
        ))
      )}
    </Container>
  )
}
