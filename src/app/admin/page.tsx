'use client'

import styles from './page.module.scss'

import Container from '@/components/Container'
import Flow from '@/components/Flow'
import { Heading, Link } from '@radix-ui/themes'
import NextLink from 'next/link'

export default function Page() {
  return (
    <Container>
      <Flow>
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
      </Flow>
    </Container>
  )
}
