'use client'

import styles from './page.module.scss'
import NextLink from 'next/link'
import { SessionProvider, useSession } from 'next-auth/react'
import { Heading, Link } from '@radix-ui/themes'
import Center from '@/components/Center'
import DashboardPage from './dashboard/page'

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
  const { data: session, status } = useSession()

  return (
    <>
      <ol>
        <li>
          <Link asChild>
            <NextLink href="/signin">/signin</NextLink>
          </Link>
        </li>
        <li>
          <Link asChild>
            <NextLink href="/verify-request">/verify-request</NextLink>
          </Link>
        </li>
        <li>
          <Link asChild>
            <NextLink href="/dashboard">/dashboard</NextLink>
          </Link>
        </li>
      </ol>
      {status == 'authenticated' ? (
        <DashboardPage />
      ) : (
        <Center>
          <Heading>Welcome to Askua.</Heading>
        </Center>
      )}
    </>
  )
}

function Wrappers(props: PageProps) {
  return (
    <SessionProvider>
      <Page {...props} />
    </SessionProvider>
  )
}

export default Wrappers
