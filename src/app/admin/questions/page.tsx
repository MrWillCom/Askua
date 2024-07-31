'use client'

import Container from '@/components/Container'
import Flow from '@/components/Flow'
import { Heading, Select } from '@radix-ui/themes'
import AuthorizedView from '@/components/AuthorizedView'
import { useState } from 'react'
import useBoxList from '@/hooks/useBoxList'
import AutoSpinnerView from '@/components/AutoSpinnerView'
import QuestionList from '@/components/QuestionList'
import useQuestionList from '@/hooks/useQuestionList'
import noSsr from '@/utils/noSsr'

const Page = () => {
  const [filterValue, setFilterValue] = useState('replies:not-replied')
  const {
    data: questions,
    error: useQuestionListError,
    isLoading: useQuestionListIsLoading,
  } = useQuestionList(
    {
      isReplied:
        filterValue === 'replies:not-replied'
          ? false
          : filterValue === 'replies:replied'
            ? true
            : undefined,
      boxId: filterValue.startsWith('boxes:')
        ? filterValue.split('boxes:')[1]
        : undefined,
    },
    { admin: true },
  )
  const {
    data: boxes,
    error: useBoxListError,
    isLoading: useBoxListIsLoading,
  } = useBoxList({ admin: true })

  return (
    <Container>
      <Flow>
        <Heading as="h1">Manage Questions</Heading>
        <AuthorizedView message="manage questions">
          <Select.Root
            size="3"
            value={filterValue}
            onValueChange={setFilterValue}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Item value="all">All</Select.Item>
                <Select.Separator />
                <Select.Label>Replies</Select.Label>
                <Select.Item value="replies:replied">Replied</Select.Item>
                <Select.Item value="replies:not-replied">
                  Not replied
                </Select.Item>
                <Select.Separator />
                <Select.Label>Boxes</Select.Label>
                <AutoSpinnerView
                  error={useBoxListError}
                  isLoading={useBoxListIsLoading}
                >
                  {boxes?.map(b => (
                    <Select.Item value={'boxes:' + b.id} key={b.id}>
                      {b.name}
                    </Select.Item>
                  ))}
                </AutoSpinnerView>
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <AutoSpinnerView
            error={useQuestionListError}
            isLoading={useQuestionListIsLoading}
          >
            <QuestionList admin data={questions!} />
          </AutoSpinnerView>
        </AuthorizedView>
      </Flow>
    </Container>
  )
}

export default noSsr(Page)
