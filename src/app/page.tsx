'use client'

import styles from './page.module.scss'
import NextLink from 'next/link'
import { SessionProvider, useSession } from 'next-auth/react'
import { Box, Button, Flex, Heading, Link, Separator } from '@radix-ui/themes'
import Center from '@/components/Center'

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
        <li>
          <Link asChild>
            <NextLink href="/settings">/settings</NextLink>
          </Link>
        </li>
      </ol>
      <Separator my="2" size="4" />
      <Center>
        <Flex direction="column" gap="2" align="center">
          <Heading>Welcome to Askua.</Heading>
          <Flex gap="2">
            {status == 'authenticated' ? (
              <Button size="3" asChild>
                <NextLink href="/dashboard">前往仪表板</NextLink>
              </Button>
            ) : (
              <>
                <Button size="3" asChild>
                  <NextLink href="/signin">创建账户</NextLink>
                </Button>
                <Button variant="surface" size="3" asChild>
                  <NextLink href="/signin">登录</NextLink>
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Center>
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
