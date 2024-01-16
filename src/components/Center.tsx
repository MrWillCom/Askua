import styles from './Center.module.scss'
import { Flex } from '@radix-ui/themes'

interface CenterProps {
  className?: string
  asChild?: boolean
  fillViewportHeight?: boolean
  children?: React.ReactNode
}

const Center: React.FunctionComponent<CenterProps> = ({
  className,
  asChild,
  fillViewportHeight,
  children,
}) => {
  return (
    <Flex
      align="center"
      justify="center"
      className={
        styles.center +
        (fillViewportHeight ? ' ' + styles.fillViewportHeight : '') +
        (className ? ' ' + className : '')
      }
      asChild={asChild}
    >
      {children}
    </Flex>
  )
}

export default Center
