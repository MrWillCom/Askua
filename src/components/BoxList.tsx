import type { Box } from '@/hooks/useBoxList'
import cardProps from '@/props/cardProps'
import {
  Card,
  Flex,
  Link,
  Text,
  Badge,
  Button,
  Dialog,
  TextField,
  TextArea,
  Switch,
} from '@radix-ui/themes'
import NextLink from 'next/link'
import { ExternalLinkIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import Flow from '@/components/Flow'
import { toast } from 'sonner'
import { useState } from 'react'
import axios from 'axios'
import { useSWRConfig } from 'swr'
import useSecret from '@/hooks/useSecret'

interface BoxListProps {
  admin?: boolean
  data: Box[]
}

const BoxList: React.FunctionComponent<BoxListProps> = ({ admin, data }) => {
  const [submitButtonIsLoading, setSubmitButtonIsLoading] = useState(false)
  const { mutate } = useSWRConfig()
  const [secret] = useSecret()

  return data?.map(b => (
    <Card key={b.id} {...cardProps}>
      <Flex justify="between" align="center">
        <Flex direction="column" gap="1">
          <Flex align="center" gap="1">
            {admin ? (
              <Text size="4">{b.name}</Text>
            ) : (
              <Link size="4" asChild>
                <NextLink href={'/box/' + b.identifier}>{b.name}</NextLink>
              </Link>
            )}
            {b.open ? (
              <Badge color="green">Open</Badge>
            ) : (
              <Badge color="red">Closed</Badge>
            )}
            {!b.public ? <Badge color="gray">Private</Badge> : null}
          </Flex>
          {b.description ? (
            <Text color="gray" size="2">
              {b.description}
            </Text>
          ) : null}
          {admin ? (
            <Flex gap="1">
              <Button variant="soft" size="1" asChild>
                <NextLink href={'/box/' + b.identifier}>
                  <ExternalLinkIcon /> Open
                </NextLink>
              </Button>
              <Dialog.Root>
                <Dialog.Trigger>
                  <Button variant="soft" size="1">
                    <Pencil2Icon /> Edit
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content maxWidth="450px" size="2">
                  <Dialog.Title>Edit a Box</Dialog.Title>
                  <Dialog.Description color="gray" size="2">
                    Make changes to the details of the box.
                  </Dialog.Description>
                  <Flow mt="1" asChild>
                    <form
                      action={formData => {
                        toast.promise(
                          async () => {
                            setSubmitButtonIsLoading(true)
                            formData.set('id', b.id)
                            formData.set(
                              'open',
                              formData.get('open') === 'on' ? 'true' : 'false',
                            )
                            formData.set(
                              'public',
                              formData.get('public') === 'on'
                                ? 'true'
                                : 'false',
                            )

                            try {
                              const response = await axios.put(
                                '/api/v1/box/update',
                                formData,
                                {
                                  headers: {
                                    Authorization: 'Bearer ' + secret,
                                  },
                                },
                              )
                              mutate('/api/v1/box/list')
                              return response
                            } finally {
                              setSubmitButtonIsLoading(false)
                            }
                          },
                          {
                            loading: 'Saving box...',
                            success: 'Box saved',
                            error: err => {
                              return (
                                err?.response?.data?.error ??
                                'Failed to edit box'
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
                          defaultValue={b.name}
                        />
                      </Text>
                      <Text as="label">
                        Identifier
                        <TextField.Root
                          name="identifier"
                          disabled={submitButtonIsLoading}
                          defaultValue={b.identifier}
                        />
                      </Text>
                      <Text as="label">
                        Description
                        <TextArea
                          name="description"
                          disabled={submitButtonIsLoading}
                          defaultValue={b.description}
                        />
                      </Text>
                      <Text as="label">
                        <Flex gap="2" justify="between">
                          <Text size="2">Open</Text>
                          <Switch
                            defaultChecked={b.open}
                            name="open"
                            disabled={submitButtonIsLoading}
                          />
                        </Flex>
                      </Text>
                      <Text as="label">
                        <Flex gap="2" justify="between">
                          <Text size="2">Public</Text>
                          <Switch
                            defaultChecked={b.public}
                            name="public"
                            disabled={submitButtonIsLoading}
                          />
                        </Flex>
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
                            Save
                          </Button>
                        </Dialog.Close>
                      </Flex>
                    </form>
                  </Flow>
                </Dialog.Content>
              </Dialog.Root>
              <Dialog.Root>
                <Dialog.Trigger>
                  <Button variant="soft" size="1" color="red">
                    <TrashIcon /> Delete
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content maxWidth="450px" size="2">
                  <Dialog.Title>Delete a Box</Dialog.Title>
                  <Dialog.Description color="gray" size="2">
                    Deleting a box is permanent and cannot be undone. The
                    questions inside it will also be lost.
                  </Dialog.Description>
                  <Flow mt="1" asChild>
                    <form
                      action={formData => {
                        toast.promise(
                          async () => {
                            setSubmitButtonIsLoading(true)
                            try {
                              const response = await axios.delete(
                                '/api/v1/box/delete?' +
                                  new URLSearchParams({
                                    id: b.id,
                                  }).toString(),
                                {
                                  headers: {
                                    Authorization: 'Bearer ' + secret,
                                  },
                                },
                              )
                              mutate('/api/v1/box/list')
                              return response
                            } finally {
                              setSubmitButtonIsLoading(false)
                            }
                          },
                          {
                            loading: 'Deleting box...',
                            success: 'Box deleted',
                            error: err => {
                              return (
                                err?.response?.data?.error ??
                                'Failed to delete box'
                              )
                            },
                          },
                        )
                      }}
                    >
                      <Flex gap="2" justify="end">
                        <Dialog.Close>
                          <Button
                            variant="soft"
                            type="button"
                            disabled={submitButtonIsLoading}
                          >
                            Cancel
                          </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                          <Button
                            color="red"
                            type="submit"
                            loading={submitButtonIsLoading}
                          >
                            Delete
                          </Button>
                        </Dialog.Close>
                      </Flex>
                    </form>
                  </Flow>
                </Dialog.Content>
              </Dialog.Root>
            </Flex>
          ) : null}
        </Flex>
        <Text color="gray" size="2">
          {b.questions.length === 0 ? 'No' : b.questions.length} question
          {b.questions.length === 1 ? '' : 's'}
        </Text>
      </Flex>
    </Card>
  ))
}

export default BoxList
