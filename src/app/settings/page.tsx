import styles from './page.module.scss'

import { auth } from '@/auth'
import Container from '@/components/Container'
import {} from '@radix-ui/themes'

export default async function SignInPage() {
  const session = await auth()

  return <Container>/settings</Container>
}
