'use client'

import styles from './page.module.scss'

import Container from '@/components/Container'
import cardProps from '@/props/cardProps'
import {
  BoxIcon,
  CheckIcon,
  ChevronRightIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from '@radix-ui/react-icons'
import {
  Badge,
  Button,
  ButtonProps,
  Card,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
  TextField,
} from '@radix-ui/themes'
import { useLocalStorage } from '@uidotdev/usehooks'
import NextLink from 'next/link'
import { useState } from 'react'

export default function Page() {
  const [hideSecret, setHideSecret] = useState(true)
  const [storedSecret, setStoredSecret] = useLocalStorage('secret', '')
  const [inputSecret, setInputSecret] = useState(storedSecret)

  return (
    <Container>
      <Flex direction="column" gap="4">
        <Heading as="h1">Admin</Heading>
        <Card {...cardProps}>
          <Flex direction="column" gap="2" asChild>
            <form
              action={formData => {
                setStoredSecret(formData.get('secret') as string)
              }}
            >
              <Text color="gray" size="2">
                The secret is required for making changes, including box
                details, questions, replies and more.
              </Text>
              <TextField.Root
                placeholder="Secret"
                size="3"
                type={hideSecret ? 'password' : 'text'}
                name="secret"
                value={inputSecret}
                onChange={ev => {
                  setInputSecret(ev.target.value)
                }}
              />
              <Flex gap="2">
                <Button size="3" type="submit" className={styles.saveButton}>
                  <CheckIcon /> Save
                </Button>
                <IconButton
                  variant="soft"
                  size="3"
                  onClick={() => {
                    setHideSecret(!hideSecret)
                  }}
                >
                  {hideSecret ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </IconButton>
              </Flex>
            </form>
          </Flex>
        </Card>
      </Flex>
    </Container>
  )
}
