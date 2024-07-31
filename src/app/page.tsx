'use client'

import styles from './page.module.scss'

import Container from '@/components/Container'
import Center from '@/components/Center'
import {
  Card,
  Flex,
  Spinner,
  Text,
  Link,
  Badge,
  Heading,
} from '@radix-ui/themes'
import NextLink from 'next/link'
import useBoxList from '@/hooks/useBoxList'
import cardProps from '@/props/cardProps'
import Flow from '@/components/Flow'

export default function Home() {
  const { data, error, isLoading } = useBoxList()

  return (
    <Container>
      {error ? (
        <Center>{error.message}</Center>
      ) : isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <Flow>
          <Heading as="h1">Boxes</Heading>
          {data!.map(b => (
            <Card key={b.id} {...cardProps}>
              <Flex justify="between" align="center">
                <Flex align="center" gap="1">
                  <Link size="4" asChild>
                    <NextLink href={'/box/' + b.identifier}>{b.name}</NextLink>
                  </Link>
                  <Badge color="green">Open</Badge>
                </Flex>
                <Text color="gray" size="2">
                  {b.questions.length === 0 ? 'No' : b.questions.length}{' '}
                  question
                  {b.questions.length === 1 ? '' : 's'}
                </Text>
              </Flex>
            </Card>
          ))}
        </Flow>
      )}
    </Container>
  )
}
