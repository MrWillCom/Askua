import styles from './SignInView.module.scss'
import {
  Flex,
  Text,
  Heading,
  TextField,
  Button,
  Popover,
} from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form'
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

interface SignOutButtonProps {
  variant?: 'surface' | 'classic' | 'solid' | 'soft' | 'outline' | 'ghost'
}

const SignOutButton: React.FunctionComponent<SignOutButtonProps> = ({
  variant,
}) => {
  const [submitDisabled, setSubmitDisabled] = useState(false)

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button
          color="red"
          variant={variant ? variant : 'surface'}
          disabled={submitDisabled}
        >
          {!submitDisabled ? '退出登录' : '正在退出登录...'}
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Flex direction="column" gap="2">
          <Text as="p">确定退出登录？</Text>
          <Flex justify="end" gap="2">
            <Popover.Close>
              <Button variant="surface" color="gray" disabled={submitDisabled}>
                取消
              </Button>
            </Popover.Close>
            <Button
              color="red"
              disabled={submitDisabled}
              onClick={() => {
                setSubmitDisabled(true)
                signOut()
              }}
            >
              {!submitDisabled ? '退出登录' : '正在退出登录...'}
            </Button>
          </Flex>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}

interface SignInViewProps {
  className?: string | undefined
}

const SignInView: React.FunctionComponent<SignInViewProps> = ({
  className,
}) => {
  const { data: session, status } = useSession()
  const [email, setEmail] = useState('')
  const [submitDisabled, setSubmitDisabled] = useState(false)

  return status == 'authenticated' ? (
    <Flex direction="column" gap="4" className={className}>
      <Heading align="center">你已登录</Heading>
      <SignOutButton />
    </Flex>
  ) : (
    <Form.Root
      className={className}
      onSubmit={ev => {
        ev.preventDefault()
        setSubmitDisabled(true)
        signIn('email', { email, callbackUrl: '/dashboard' })
      }}
    >
      <Flex direction="column" gap="2">
        <Heading align="center">登录或创建账户</Heading>
        <Text size="2" color="gray" align="center" as="p">
          输入邮箱以登录，未注册则自动创建账户
        </Text>
        <Form.Field name="email">
          <Form.Control asChild>
            <TextField.Input
              placeholder="name@example.com"
              type="email"
              required
              autoFocus
              value={email}
              onChange={ev => setEmail(ev.target.value)}
            />
          </Form.Control>
          <Text size="1" color="red">
            <Form.Message match="valueMissing">请输入邮箱</Form.Message>
            <Form.Message match="typeMismatch">请输入正确的邮箱</Form.Message>
          </Text>
        </Form.Field>
        <Form.Submit asChild>
          <Button disabled={submitDisabled}>
            {!submitDisabled ? '登录' : '正在登录...'}
          </Button>
        </Form.Submit>
      </Flex>
    </Form.Root>
  )
}

function Wrappers(props: SignInViewProps) {
  return (
    <SessionProvider>
      <SignInView {...props} />
    </SessionProvider>
  )
}

export default Wrappers

export { Wrappers as SignInView, SignOutButton }
