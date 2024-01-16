'use client'

import styles from './page.module.scss'
import { Box, Flex, Grid, Text } from '@radix-ui/themes'
import SignInView from '@/components/SignInView'

export default function Page() {
  return (
    <Grid columns={{ initial: '1', md: '2' }} className={styles.grid}>
      <Box
        display={{ initial: 'none', md: 'block' }}
        p="6"
        className={styles.left}
      >
        <Text weight="medium" size="6">
          Askua
        </Text>
      </Box>
      <Flex align="center" justify="center" width="100%" p="2">
        <SignInView className={styles.panel} />
      </Flex>
    </Grid>
  )
}
