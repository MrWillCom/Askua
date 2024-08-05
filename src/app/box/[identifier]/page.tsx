'use client'

import styles from './page.module.scss'

import Container from '@/components/Container'
import useQuestionList from '@/hooks/useQuestionList'
import {
  Card,
  Flex,
  Heading,
  TextArea,
  Button,
  Inset,
  Text,
} from '@radix-ui/themes'
import useBox from '@/hooks/useBox'
import cardProps from '@/props/cardProps'
import axios from 'axios'
import { useState, useRef } from 'react'
import { toast } from 'sonner'
import Flow from '@/components/Flow'
import AutoSpinnerView from '@/components/AutoSpinnerView'
import QuestionList from '@/components/QuestionList'

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
  } = useQuestionList(
    {
      boxId: box?.id,
    },
    {
      shouldFetch: typeof box?.id === 'string',
    },
  )

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
          <Text color="gray" className={styles.preWrap}>
            {box?.description}
          </Text>
          {box?.open ? (
            <Card {...cardProps}>
              <Inset clip="padding-box">
                <form
                  action={formData => {
                    toast.promise(
                      async () => {
                        setAskButtonLoading(true)
                        formData.set('boxId', box!.id)
                        try {
                          const { data } = await axios.post(
                            '/api/v1/question/create',
                            formData,
                          )

                          askFormRef.current!.reset()
                          useQuestionListMutate([data, ...questions!])
                          return data
                        } finally {
                          setAskButtonLoading(false)
                        }
                      },
                      {
                        loading: 'Delivering question...',
                        success: 'Question delivered',
                        error: err => {
                          return (
                            err?.response?.data?.error ??
                            'Failed to deliver question'
                          )
                        },
                      },
                    )
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
          ) : null}
          <QuestionList data={questions!} />
        </AutoSpinnerView>
      </Flow>
    </Container>
  )
}
