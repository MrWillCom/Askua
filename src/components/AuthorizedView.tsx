import useAuthorized from '@/hooks/useAuthorized'
import Center from '@/components/Center'
import { Link, Text } from '@radix-ui/themes'
import NextLink from 'next/link'

interface AuthorizedViewProps {
  children?: React.ReactNode
  message?: string | React.ReactNode
}

const AuthorizedView: React.FC<AuthorizedViewProps> = ({
  children,
  message,
}) => {
  const [authorized] = useAuthorized()

  return authorized ? (
    children
  ) : (
    <Center>
      <Text color="gray">
        You need to be{' '}
        <Link asChild>
          <NextLink href="/admin/auth">authorized</NextLink>
        </Link>
        {message ? <> to {message}.</> : '.'}
      </Text>
    </Center>
  )
}

export default AuthorizedView
