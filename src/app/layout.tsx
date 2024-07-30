import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Theme } from '@radix-ui/themes'
import { Toaster } from 'sonner'

import 'modern-normalize/modern-normalize.css'
import '@radix-ui/themes/styles.css'
import './globals.scss'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <Theme grayColor="slate" accentColor="sky" radius="large">
            {children}
            <Toaster position="top-center" richColors />
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  )
}
