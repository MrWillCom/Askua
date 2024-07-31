import styles from './QuestionList.module.scss'

import type { Question } from '@/hooks/useQuestionList'
import cardProps from '@/props/cardProps'
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import {
  Badge,
  Button,
  Card,
  Dialog,
  Flex,
  Switch,
  Text,
  TextArea,
} from '@radix-ui/themes'
import moment from 'moment'
import Flow from '@/components/Flow'
import { useState } from 'react'
import { useSWRConfig } from 'swr'
import useSecret from '@/hooks/useSecret'
import { toast } from 'sonner'
import axios from 'axios'

interface QuestionListProps {
  admin?: boolean
  data: Question[]
}

const QuestionList: React.FunctionComponent<QuestionListProps> = ({
  admin,
  data,
}) => {
  const [submitButtonIsLoading, setSubmitButtonIsLoading] = useState(false)
  const { mutate } = useSWRConfig()
  const [secret] = useSecret()

  return data?.map(q => (
    <Card key={q.id} {...cardProps}>
      <Flex direction="column" gap="1">
        <Text size="5" weight="medium">
          {q.content}
        </Text>
        {q.reply ? (
          <Text color="gray" size="3" className={styles.preWrap}>
            {q.reply}
          </Text>
        ) : (
          <Text color="gray" size="3">
            Unanswered
          </Text>
        )}
        {q.repliedAt ? (
          <Text color="gray" size="2">
            {moment(q.repliedAt).fromNow()}
          </Text>
        ) : null}
        {admin ? (
          <>
            {!q.public ? <Badge color="gray">Private</Badge> : null}
            <Flex gap="1">
              <Dialog.Root>
                <Dialog.Trigger>
                  <Button variant="soft" size="1">
                    <Pencil2Icon /> Reply or Edit
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content maxWidth="450px" size="2">
                  <Dialog.Title>Edit a Question</Dialog.Title>
                  <Dialog.Description color="gray" size="2">
                    Make changes to the details of the box.
                  </Dialog.Description>
                  <Flow mt="1" asChild>
                    <form
                      action={formData => {
                        toast.promise(
                          async () => {
                            setSubmitButtonIsLoading(true)
                            formData.set('id', q.id)
                            formData.set(
                              'public',
                              formData.get('public') === 'on'
                                ? 'true'
                                : 'false',
                            )

                            try {
                              const response = await axios.put(
                                '/api/v1/question/update',
                                formData,
                                {
                                  headers: {
                                    Authorization: 'Bearer ' + secret,
                                  },
                                },
                              )
                              mutate(key =>
                                (key as string).startsWith(
                                  '/api/v1/question/list',
                                ),
                              )
                              return response
                            } finally {
                              setSubmitButtonIsLoading(false)
                            }
                          },
                          {
                            loading: 'Saving question...',
                            success: 'Question saved',
                            error: err => {
                              return (
                                err?.response?.data?.error ??
                                'Failed to edit question'
                              )
                            },
                          },
                        )
                      }}
                    >
                      <Text as="label">
                        Content
                        <TextArea
                          name="content"
                          disabled={submitButtonIsLoading}
                          defaultValue={q.content}
                        />
                      </Text>
                      <Text as="label">
                        Reply
                        <TextArea
                          name="reply"
                          disabled={submitButtonIsLoading}
                          defaultValue={q.reply}
                        />
                      </Text>
                      <Text as="label">
                        <Flex gap="2" justify="between">
                          <Text size="2">Public</Text>
                          <Switch
                            defaultChecked={q.public}
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
              <Button variant="soft" size="1" color="red" disabled>
                <TrashIcon /> Delete
              </Button>
            </Flex>
          </>
        ) : null}
      </Flex>
    </Card>
  ))
}

export default QuestionList
