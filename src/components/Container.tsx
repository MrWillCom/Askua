import styles from './Container.module.scss'

import React from 'react'
import { Box } from '@radix-ui/themes'

interface ContainerProps {
  children?: React.ReactNode
  centerChild?: boolean
}

const Container: React.FunctionComponent<ContainerProps> = ({
  children,
  centerChild,
}) => {
  return (
    <Box
      className={styles.container + (centerChild ? ' ' + styles.center : '')}
    >
      <Box className={styles.inner}>{children}</Box>
    </Box>
  )
}

export default Container
