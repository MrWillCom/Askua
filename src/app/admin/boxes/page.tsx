'use client'

import styles from './page.module.scss'

import Container from '@/components/Container'
import Flow from '@/components/Flow'
import { PlusIcon } from '@radix-ui/react-icons'
import {
  Button,
  Code,
  Dialog,
  Flex,
  Heading,
  Switch,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import AuthorizedView from '@/components/AuthorizedView'
import BoxList from '@/components/BoxList'
import { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { useSWRConfig } from 'swr'
import useSecret from '@/hooks/useSecret'
import useBoxList from '@/hooks/useBoxList'
import AutoSpinnerView from '@/components/AutoSpinnerView'

export default function Page() {
  const [createBoxIdentifier, setCreateBoxIdentifier] = useState('')
  const [submitButtonIsLoading, setSubmitButtonIsLoading] = useState(false)
  const { mutate } = useSWRConfig()
  const [secret] = useSecret()
  const { data, error, isLoading } = useBoxList({ admin: true })

  return (
    <Container>
      <Flow>
        <Heading as="h1">Manage Boxes</Heading>
        <AuthorizedView message="manage boxes">
          <Dialog.Root
            onOpenChange={open => {
              if (!open) {
                setCreateBoxIdentifier('')
              }
            }}
          >
            <Dialog.Trigger>
              <Button variant="soft" size="3">
                <PlusIcon /> Create
              </Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth="450px" size="2">
              <Dialog.Title>Create a Box</Dialog.Title>
              <Dialog.Description color="gray" size="2">
                Create a new empty box to start collecting questions.
              </Dialog.Description>
              <Flow mt="1" asChild>
                <form
                  action={formData => {
                    toast.promise(
                      async () => {
                        setSubmitButtonIsLoading(true)
                        formData.set(
                          'open',
                          formData.get('open') === 'on' ? 'true' : 'false',
                        )
                        formData.set(
                          'public',
                          formData.get('public') === 'on' ? 'true' : 'false',
                        )
                        try {
                          const response = await axios.post(
                            '/api/v1/box/create',
                            formData,
                            { headers: { Authorization: 'Bearer ' + secret } },
                          )
                          mutate('/api/v1/box/list')
                          return response
                        } finally {
                          setSubmitButtonIsLoading(false)
                        }
                      },
                      {
                        loading: 'Creating box...',
                        success: 'Box created',
                        error: err => {
                          return (
                            err?.response?.data?.error ?? 'Failed to create box'
                          )
                        },
                      },
                    )
                  }}
                >
                  <Text as="label">
                    Name
                    <TextField.Root
                      name="name"
                      disabled={submitButtonIsLoading}
                    />
                  </Text>
                  <Text as="label">
                    Identifier
                    <TextField.Root
                      name="identifier"
                      onChange={ev => {
                        setCreateBoxIdentifier(ev.target.value)
                      }}
                      disabled={submitButtonIsLoading}
                    />
                  </Text>
                  <Text as="label">
                    Description
                    <TextArea
                      name="description"
                      disabled={submitButtonIsLoading}
                    />
                  </Text>
                  <Text as="label">
                    <Flex gap="2" justify="between">
                      <Text size="2">Open</Text>
                      <Switch
                        defaultChecked
                        name="open"
                        disabled={submitButtonIsLoading}
                      />
                    </Flex>
                  </Text>
                  <Text as="label">
                    <Flex gap="2" justify="between">
                      <Text size="2">Public</Text>
                      <Switch
                        defaultChecked
                        name="public"
                        disabled={submitButtonIsLoading}
                      />
                    </Flex>
                  </Text>
                  <Text size="2">
                    Your new box will be located at{' '}
                    <Code>
                      /box/
                      {createBoxIdentifier.length > 0
                        ? createBoxIdentifier
                        : '<identifier>'}
                    </Code>
                    .
                  </Text>
                  <Flex gap="2" justify="end">
                    <Dialog.Close>
                      <Button
                        variant="soft"
                        color="gray"
                        type="reset"
                        disabled={submitButtonIsLoading}
                      >
                        Cancel
                      </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                      <Button type="submit" loading={submitButtonIsLoading}>
                        Create
                      </Button>
                    </Dialog.Close>
                  </Flex>
                </form>
              </Flow>
            </Dialog.Content>
          </Dialog.Root>
          <AutoSpinnerView error={error} isLoading={isLoading}>
            <BoxList admin data={data!} />
          </AutoSpinnerView>
        </AuthorizedView>
      </Flow>
    </Container>
  )
}
