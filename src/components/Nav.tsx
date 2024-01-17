'use client'

import Link from 'next/link'
import styles from './Nav.module.scss'
import { Button, DropdownMenu, Flex, Heading } from '@radix-ui/themes'
import { SessionProvider, useSession } from 'next-auth/react'
import { CaretDown } from '@phosphor-icons/react/dist/ssr'
import { SignOutButton } from './SignInView'

interface NavProps {}

const Nav: React.FunctionComponent<NavProps> = () => {
  const { data: session, status } = useSession()

  return (
    <Flex px="2" pl="3" height="8" align="center" justify="between" asChild>
      <nav className={styles.nav}>
        <Heading
          size="4"
          style={{
            color: 'var(--gray-12)',
            textDecoration: 'none',
          }}
          asChild
        >
          <Link href="/">Askua</Link>
        </Heading>
        <Flex gap="2">
          {status == 'authenticated' ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="soft">
                  {session.user?.name ? session.user.name : session.user?.email}
                  <CaretDown />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end">
                <DropdownMenu.Item asChild>
                  <Link href="/dashboard">仪表板</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link href="/settings">设置</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item asChild>
                  <SignOutButton variant="outline" />
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          ) : (
            <>
              <Button asChild>
                <Link href="/signin">创建账户</Link>
              </Button>
              <Button variant="surface" asChild>
                <Link href="/signin">登录</Link>
              </Button>
            </>
          )}
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
