import useAuthorized from '@/hooks/useAuthorized'
import Center from '@/components/Center'
import { Text } from '@radix-ui/themes'

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
        You need to be authorized{message ? <>to {message}.</> : '.'}
      </Text>
    </Center>
  )
}

export default AuthorizedView
