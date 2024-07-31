import useBoxList from '@/hooks/useBoxList'
import AutoSpinnerView from '@/components/AutoSpinnerView'
import cardProps from '@/props/cardProps'
import { Card, Flex, Link, Text, Badge, Button } from '@radix-ui/themes'
import NextLink from 'next/link'
import {
  ExternalLinkIcon,
  Pencil2Icon,
  TrashIcon,
} from '@radix-ui/react-icons'

interface BoxListProps {
  admin?: boolean
}

const BoxList: React.FunctionComponent<BoxListProps> = ({ admin }) => {
  const { data, error, isLoading } = useBoxList({ admin })

  return (
    <AutoSpinnerView error={error} isLoading={isLoading}>
      {data?.map(b => (
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
                  <Button variant="soft" size="1">
                    <Pencil2Icon /> Edit
                  </Button>
                  <Button variant="soft" size="1" color="red">
                    <TrashIcon /> Delete
                  </Button>
                </Flex>
              ) : null}
            </Flex>
            <Text color="gray" size="2">
              {b.questions.length === 0 ? 'No' : b.questions.length} question
              {b.questions.length === 1 ? '' : 's'}
            </Text>
          </Flex>
        </Card>
      ))}
    </AutoSpinnerView>
  )
}

export default BoxList
