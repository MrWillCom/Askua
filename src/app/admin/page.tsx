'use client'

import styles from './page.module.scss'

import Container from '@/components/Container'
import {
  Flex,
  Heading,
  Link,
} from '@radix-ui/themes'
import NextLink from 'next/link'

export default function Page() {
  return (
    <Container>
      <Flex direction="column" gap="4">
        <Heading as="h1">Admin</Heading>
        <ul>
          <li>
            <Link asChild>
              <NextLink href="/admin/auth">Auth</NextLink>
            </Link>
          </li>
          <li>
            <Link asChild>
              <NextLink href="/admin/boxes">Boxes</NextLink>
            </Link>
          </li>
        </ul>
      </Flex>
    </Container>
  )
}
