'use client'

import styles from './page.module.scss'
import {
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Separator,
  Text,
} from '@radix-ui/themes'
import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status == 'unauthenticated') {
    router.push('/')
  } else if (status == 'authenticated') {
    return (
      <Container my="8" px="4">
        <Flex direction="column" gap="4">
          <Heading size="8">
            <Text color="gray">你好</Text>{' '}
            {session.user?.name ? session.user.name : session.user?.email}
          </Heading>
          {session.user?.name ? (
            <></>
          ) : (
            <Card>
              <Flex direction="column" gap="2">
                <Heading size="4">完善个人主页</Heading>
                <Text color="gray" as="p">
                  你还没有设置名字等个人信息，你可以在设置中检查这些信息。
                </Text>
                <Flex gap="2">
                  <Button asChild>
                    <Link href="/settings">前往设置</Link>
                  </Button>
                  {/* TODO: implement the ignore button */}
                  <Button variant="outline" disabled>
                    忽略
                  </Button>
                </Flex>
              </Flex>
            </Card>
          )}
          <Separator size="4" />
        </Flex>
      </Container>
    )
  } else if (status == 'loading') {
    // TODO: add a spinner
    return <Text color="gray">Loading...</Text>
  }
}

function Wrappers(props: PageProps) {
  return (
    <SessionProvider>
      <Page {...props} />
    </SessionProvider>
  )
}

export default Wrappers
