import styles from './page.module.scss'

import { auth } from '@/auth'
import Container from '@/components/Container'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Callout, Flex, Text, Link, Box } from '@radix-ui/themes'
import NextLink from 'next/link'

export default async function Home() {
  const session = await auth()
  const signedIn = !!session?.user

  return (
    <Container>
      {signedIn ? (
        <Flex direction="column" gap="4">
          {session.user?.username ? null : (
            <Callout.Root color="yellow">
              <Callout.Icon>
                <ExclamationTriangleIcon />
              </Callout.Icon>
              <Callout.Text>
                <Link asChild>
                  <NextLink href="/settings">Set your username</NextLink>
                </Link>{' '}
                to enable your own profile.
              </Callout.Text>
            </Callout.Root>
          )}
          <Box>
            <Text color="gray" align="center" as="p">
              Box management is under construction.
            </Text>
          </Box>
        </Flex>
      ) : (
        <></>
      )}
    </Container>
  )
}
