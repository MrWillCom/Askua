import styles from './page.module.scss'

import { signIn, auth } from '@/auth'
import Container from '@/components/Container'
import { Box, Button, Heading, TextField, Text } from '@radix-ui/themes'
import { Responsive } from '@radix-ui/themes/props'

export default async function SignInPage() {
  const session = await auth()

  const formControlProps: { size: Responsive<'3'>; disabled: boolean } = {
    size: '3',
    disabled: !!session?.user,
  }

  return (
    <Container centerChild>
      <Box className={styles.thinContainer}>
        <Heading color="gray" size="8" as="h1">
          Join Askua
        </Heading>
        <Heading as="h1">Create an Account or Sign In</Heading>
        <Text color="gray">
          Askua is the place for opening boxes to receive anonymous questions.
          It's simple, pure and modern. Plus, it's open source.
        </Text>
        <Text>
          A magic link for signing in will be delivered to your inbox. If you
          don't have an account, a new one will be created.
        </Text>
        <form
          action={async formData => {
            'use server'
            await signIn('resend', {
              email: formData.get('email'),
              redirectTo: '/',
            })
          }}
          className={styles.form}
        >
          <TextField.Root
            type="email"
            name="email"
            placeholder="Email"
            {...formControlProps}
          />
          <Button type="submit" {...formControlProps}>
            Sign in or create an account
          </Button>
        </form>
        {!!session?.user ? (
          <Text color="gray" align="center">
            You're signed in.
          </Text>
        ) : null}
      </Box>
    </Container>
  )
}
