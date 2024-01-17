'use client'

import {
  Box,
  Flex,
  Heading,
  Section,
  Separator,
  Text,
  TextField,
} from '@radix-ui/themes'
import { SessionProvider, useSession } from 'next-auth/react'
import { useState } from 'react'

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
  const { data: session, status } = useSession()
  const [newName, setNewName] = useState('')

  return (
    <Flex direction="column" gap="4">
      <Flex direction="column" gap="2">
        <Heading>名字</Heading>
        <TextField.Root>
          <TextField.Input
            value={newName}
            onChange={ev => {
              setNewName(ev.target.value)
            }}
            placeholder={session?.user?.name || ''}
          />
        </TextField.Root>
        <Text color="gray" size="2" as="p">
          你的名字会显示在仪表板、你的主页等位置。
        </Text>
      </Flex>
    </Flex>
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
