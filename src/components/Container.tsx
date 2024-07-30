import styles from './Container.module.scss'

import { Container as RadixContainer } from '@radix-ui/themes'

interface ContainerProps {
  children?: React.ReactNode
  className?: string
}

const Container: React.FunctionComponent<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <RadixContainer className={styles.container + (className ? ' ' + className : '')}>
      {children}
    </RadixContainer>
  )
}

export default Container
