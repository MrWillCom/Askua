import styles from './Navigation.module.scss'

import { auth, signOut } from '@/auth'
import {
  Button,
  ButtonProps,
  DropdownMenu,
  Heading,
  Text,
} from '@radix-ui/themes'
import {
  DashboardIcon,
  ExitIcon,
  GearIcon,
  HomeIcon,
  PersonIcon,
  RocketIcon,
} from '@radix-ui/react-icons'
import Link from 'next/link'

interface NavigationProps {}

const Navigation: React.FunctionComponent<NavigationProps> = async () => {
  const session = await auth()
  const signedIn = !!session?.user

  const navButtonProps: ButtonProps = {
    variant: 'ghost',
    size: '3',
  }

  return (
    <nav className={styles.navigation}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {signedIn ? (
            <Button {...navButtonProps}>
              {session.user?.name ?? session.user?.email}
            </Button>
          ) : (
            <Button {...navButtonProps}>Askua</Button>
          )}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content variant={signedIn ? 'soft' : 'solid'}>
          {signedIn ? (
            <>
              <DropdownMenu.Item asChild>
                <Link href="/">
                  <DashboardIcon />
                  Dashboard
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild disabled={!session.user?.username}>
                <Link href={'/u/' + session.user?.username}>
                  <PersonIcon />
                  Profile
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link href="/settings">
                  <GearIcon />
                  Settings
                </Link>
              </DropdownMenu.Item>
              <form
                action={async () => {
                  'use server'
                  await signOut()
                }}
              >
                <DropdownMenu.Item color="red" asChild>
                  <button type="submit" className={styles.signOutFormButton}>
                    <ExitIcon />
                    Sign out
                  </button>
                </DropdownMenu.Item>
              </form>
            </>
          ) : (
            <>
              <DropdownMenu.Label className={styles.greetingItem}>
                <Heading as="h1">
                  👋
                  <br />
                  Welcome to Askua!
                </Heading>
                <Text color="gray">
                  Askua is the place for opening boxes to receive anonymous
                  questions. It's simple, pure and modern.
                </Text>
              </DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.Item asChild>
                <Link href="/">
                  <HomeIcon />
                  Home
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link href="/sign-in">
                  <RocketIcon />
                  Get Started
                </Link>
              </DropdownMenu.Item>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </nav>
  )
}

export default Navigation
