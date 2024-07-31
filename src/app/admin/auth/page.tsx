'use client'

import styles from './page.module.scss'

import Container from '@/components/Container'
import Flow from '@/components/Flow'
import useAuthorized from '@/hooks/useAuthorized'
import useSecret from '@/hooks/useSecret'
import { CheckIcon, EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import {
  Badge,
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  TextField,
} from '@radix-ui/themes'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Page() {
  const [hideSecret, setHideSecret] = useState(true)
  const [secret, setSecret] = useSecret()
  const [inputSecret, setInputSecret] = useState(secret ?? '')
  const [authorized, setAuthorized] = useAuthorized()

  return (
    <Container>
      <Flow>
        <Heading as="h1">Auth</Heading>
        <Flex direction="column" gap="2" asChild>
          <form
            action={async formData => {
              const { authorized } = (
                await axios.post('/api/v1/admin/verify', null, {
                  headers: {
                    Authorization: 'Bearer ' + formData.get('secret'),
                  },
                })
              ).data
              if (authorized) {
                toast.success('Authorized', {
                  description: 'Your secret is correct and saved locally.',
                })
              } else {
                toast.error('Unauthorized', {
                  description:
                    "Your secret is incorrect, but it's still saved locally.",
                })
              }
              setAuthorized(authorized)
              setSecret(formData.get('secret') as string)
            }}
          >
            <Heading as="h2" size="5">
              Secret{' '}
              {authorized ? <Badge color="green">Authorized</Badge> : null}
            </Heading>
            <Text color="gray" size="2">
              Managing boxes and questions needs the secret to verify your
              access.
            </Text>
            <TextField.Root
              placeholder="Secret"
              type={hideSecret ? 'password' : 'text'}
              name="secret"
              value={inputSecret}
              onChange={ev => {
                setInputSecret(ev.target.value)
              }}
            />
            <Flex gap="2">
              <Button type="submit" className={styles.saveButton}>
                <CheckIcon /> Save
              </Button>
              <IconButton
                variant="soft"
                onClick={() => {
                  setHideSecret(!hideSecret)
                }}
                type="button"
              >
                {hideSecret ? <EyeClosedIcon /> : <EyeOpenIcon />}
              </IconButton>
            </Flex>
          </form>
        </Flex>
      </Flow>
    </Container>
  )
}
