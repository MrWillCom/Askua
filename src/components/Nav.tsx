'use client'

import Link from 'next/link'
import styles from './Nav.module.scss'
import { Box, Button, Flex, Heading } from '@radix-ui/themes'
import { SessionProvider, useSession } from 'next-auth/react'

interface NavProps {}

const Nav: React.FunctionComponent<NavProps> = () => {
  const { data: session, status } = useSession()

  return (
    <Flex px="2" pl="3" height="8" align="center" justify="between" asChild>
      <nav className={styles.nav}>
        <Heading size="4" asChild>
          <Link href="/">Askua</Link>
        </Heading>
        <Flex gap="2">
          <Button asChild>
            <Link href="/signin">创建账户</Link>
          </Button>
          <Button variant="surface" asChild>
            <Link href="/signin">登录</Link>
          </Button>
        </Flex>
      </nav>
    </Flex>
  )
}

function Wrappers(props: NavProps) {
  return (
    <SessionProvider>
      <Nav {...props} />
    </SessionProvider>
  )
}

export default Wrappers
