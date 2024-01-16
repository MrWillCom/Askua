'use client'

import styles from './providers.module.scss'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { Theme } from '@radix-ui/themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <Theme
        accentColor="mint"
        grayColor="sand"
        radius="large"
        className={styles.fullHeight}
      >
        {children}
      </Theme>
    </ThemeProvider>
  )
}
