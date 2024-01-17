'use client'

import styles from './layout.module.scss'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Separator,
} from '@radix-ui/themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { UrlObject } from 'url'
type Url = string | UrlObject

interface TabItemProps {
  active?: boolean
  href: Url
  children: React.ReactNode
}

const TabItem: React.FunctionComponent<TabItemProps> = ({
  active,
  href,
  children,
}) => {
  return (
    <Button variant={active ? 'solid' : 'outline'} asChild>
      <Link href={href}>{children}</Link>
    </Button>
  )
}

interface layoutProps {
  children: React.ReactNode
}

const layout: React.FunctionComponent<layoutProps> = ({ children }) => {
  const pathname = usePathname()

  const routes: { href: Url; children: React.ReactNode }[] = [
    { href: '/settings/account', children: '账户' },
  ]

  return (
    <Container my="8" px="4">
      <Box mx="2" mb="6">
        <Heading size="8">设置</Heading>
      </Box>
      <Flex mx="2" my="4" gap="2">
        {routes.map(v => (
          <TabItem
            href={v.href}
            active={pathname == v.href}
            key={v.href as React.Key}
          >
            {v.children}
          </TabItem>
        ))}
      </Flex>
      <Separator size="4" />
      <Box mx="2" my="4">
        {children}
      </Box>
    </Container>
  )
}

export default layout
