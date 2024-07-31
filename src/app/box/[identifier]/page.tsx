'use client'

import styles from './page.module.scss'

import Container from '@/components/Container'
import useQuestionList from '@/hooks/useQuestionList'
import Center from '@/components/Center'
import {
  Spinner,
  Card,
  Flex,
  Text,
  Heading,
  TextArea,
  Button,
  Inset,
} from '@radix-ui/themes'
import useBox from '@/hooks/useBox'
import moment from 'moment'
import cardProps from '@/props/cardProps'
import axios from 'axios'
import { useState, useRef } from 'react'
import { toast } from 'sonner'
import Flow from '@/components/Flow'
import AutoSpinnerView from '@/components/AutoSpinnerView'

export default function Page({ params }: { params: { identifier: string } }) {
  const {
    data: box,
    error: useBoxError,
    isLoading: useBoxIsLoading,
  } = useBox({ identifier: params.identifier })

  const {
    data: questions,
    error: useQuestionListError,
    isLoading: useQuestionListIsLoading,
    mutate: useQuestionListMutate,
  } = useQuestionList(box?.id ?? null, typeof box?.id === 'string')

  const [askButtonLoading, setAskButtonLoading] = useState(false)
  const askFormRef = useRef<HTMLFormElement>(null)

  return (
    <Container>
      <Flow>
        <AutoSpinnerView
          error={useBoxError || useQuestionListError}
          isLoading={useBoxIsLoading || useQuestionListIsLoading}
        >
          <Heading as="h1">{box?.name}</Heading>
          <Card {...cardProps}>
            <Inset clip="padding-box">
              <form
                action={formData => {
                  setAskButtonLoading(true)
                  formData.set('boxId', box!.id)
                  axios
                    .post('/api/v1/question/create', formData)
                    .then(({ data }) => {
                      toast.success('Question delivered')
                      askFormRef.current!.reset()
                      useQuestionListMutate([data, ...questions!])
                      setAskButtonLoading(false)
                    })
                }}
                ref={askFormRef}
              >
                <Flex direction="column">
                  <TextArea
                    placeholder="Ask a question"
                    variant="soft"
                    size="3"
                    radius="none"
                    className={styles.askTextArea}
                    name="content"
                  />
                  <Button
                    type="submit"
                    radius="none"
                    size="3"
                    className={styles.askButton}
                    loading={askButtonLoading}
                  >
                    Ask
                  </Button>
                </Flex>
              </form>
            </Inset>
          </Card>
          {questions?.map(q => (
            <Card key={q.id} {...cardProps}>
              <Flex direction="column" gap="1">
                <Text size="5" weight="medium">
                  {q.content}
                </Text>
                {q.reply ? (
                  <Text color="gray" size="3">
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
              </Flex>
            </Card>
          ))}
        </AutoSpinnerView>
      </Flow>
    </Container>
  )
}
