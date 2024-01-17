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
  disabled?: boolean
  children: React.ReactNode
}

const TabItem: React.FunctionComponent<TabItemProps> = ({
  active,
  href,
  disabled,
  children,
}) => {
  return (
    <Button variant={active ? 'solid' : 'outline'} disabled={disabled} asChild>
      <Link href={href}>{children}</Link>
    </Button>
  )
}

interface layoutProps {
  children: React.ReactNode
}

const layout: React.FunctionComponent<layoutProps> = ({ children }) => {
  const pathname = usePathname()

  const routes: { href: Url; children: React.ReactNode; disabled?: boolean }[] =
    [
      { href: '/settings/social', children: '社交', disabled: true },
      { href: '/settings/advanced', children: '高级', disabled: true },
    ]

  return (
    <Container my="8" px="4">
      <Box mx="2" mb="6">
        <Heading size="8">设置</Heading>
      </Box>
      <Flex m="2" gap="2">
        <TabItem
          href={'/settings/account'}
          active={pathname == '/settings/account' || pathname == '/settings'}
        >
          账户
        </TabItem>
        {routes.map(v => (
          <TabItem
            href={v.href}
            active={pathname == v.href}
            disabled={v.disabled}
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
