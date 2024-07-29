import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface VerificationRequestEmailProps {
  url: string
  host: string
}

export const VerificationRequestEmail = ({
  url,
  host,
}: VerificationRequestEmailProps) => {
  return (
    <Html>
      <Head>
        <Font fontFamily="system-ui" fallbackFontFamily="sans-serif" />
      </Head>
      <Preview>Tap the button to sign in to Askua ({host}).</Preview>
      <Body>
        <Container>
          <Heading>Sign in to Askua</Heading>
          <Text>
            This verification request comes from the Askua server on {host}. Tap
            the following button to sign in to Askua:
          </Text>
          <Button href={url}>Sign in</Button>
          <Text>
            If you did not request this email you can safely ignore it.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default VerificationRequestEmail
