import Center from '@/components/Center'
import { Spinner, Text } from '@radix-ui/themes'
import { AxiosError } from 'axios'

interface AutoSpinnerViewProps {
  error?: AxiosError | Error
  isLoading: boolean
  children?: React.ReactNode
}

const AutoSpinnerView: React.FC<AutoSpinnerViewProps> = ({
  error,
  isLoading,
  children,
}) => {
  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    )

  if (error) {
    return (
      <Center>
        <Text color="gray">{error.message ?? 'Unhandled Error'}</Text>
      </Center>
    )
  }

  return children
}

export default AutoSpinnerView
