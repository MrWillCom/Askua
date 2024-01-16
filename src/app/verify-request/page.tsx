import styles from './page.module.scss'
import { Card, Flex, Box, Heading, Text } from '@radix-ui/themes'
import Center from '@/components/Center'
import { Envelope } from '@phosphor-icons/react/dist/ssr'

export default function Page() {
  return (
    <Center fillViewportHeight>
      <Card size="2" className={styles.card}>
        <Flex direction="column" gap="2" align="center">
          <Envelope
            size={48}
            color="var(--accent-a11)"
            data-accent-color="gray"
          />
          <Heading>检查你的收件箱</Heading>
          <Text color="gray">登录链接已发送到你的邮箱</Text>
        </Flex>
      </Card>
    </Center>
  )
}
