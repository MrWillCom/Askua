'use client'

import styles from './page.module.scss'

import Container from '@/components/Container'
import useQuestionList from '@/hooks/useQuestionList'
import Center from '@/components/Center'
import { Spinner, Card, Flex, Text, Heading, TextArea } from '@radix-ui/themes'
import useBox from '@/hooks/useBox'
import moment from 'moment'
import cardProps from '@/props/cardProps'

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
  } = useQuestionList(box?.id ?? null, typeof box?.id === 'string')

  return (
    <Container>
      {useBoxError || useQuestionListError ? (
        <Center>{(useBoxError || useQuestionListError)!.message}</Center>
      ) : useBoxIsLoading || useQuestionListIsLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <>
          <Heading as="h1" size="6">
            {box?.name}
          </Heading>
          {questions!.map(q => (
            <Card key={q.id} {...cardProps}>
              <Flex direction="column" gap="1">
                <Text size="6" weight="medium">
                  {q.content}
                </Text>
                {q.reply ? (
                  <Text color="gray" size="4">
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
        </>
      )}
    </Container>
  )
}
