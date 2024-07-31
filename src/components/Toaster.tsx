'use client'

import { useTheme } from 'next-themes'
import {
  Toaster as EmilToaster,
  ToasterProps as EmilToasterProps,
} from 'sonner'

const Toaster: React.FunctionComponent<EmilToasterProps> = props => {
  const { theme } = useTheme()

  return <EmilToaster theme={theme as EmilToasterProps['theme']} {...props} />
}

export default Toaster
