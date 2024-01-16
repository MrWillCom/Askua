import styles from './page.module.scss'
import { Link } from '@radix-ui/themes'
import NextLink from 'next/link'

export default function Home() {
  return (
    <ol>
      <li>
        <Link asChild>
          <NextLink href="/signin">/signin</NextLink>
        </Link>
      </li>
      <li>
        <Link asChild>
          <NextLink href="/verify-request">/verify-request</NextLink>
        </Link>
      </li>
    </ol>
  )
}
