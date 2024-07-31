import Center from '@/components/Center'
import { Flex, Link, Text } from '@radix-ui/themes'
import NextLink from 'next/link'

interface FooterProps {}

const Footer: React.FunctionComponent<FooterProps> = () => {
  return (
    <footer>
      <Text asChild>
        <Center>
          <Flex gap="2">
            <Link asChild>
              <NextLink href="/">Home</NextLink>
            </Link>
            <Link asChild>
              <NextLink href="/admin">Admin</NextLink>
            </Link>
            <Link asChild>
              <NextLink
                href="https://github.com/MrWillCom/Askua"
                target="_blank"
              >
                GitHub
              </NextLink>
            </Link>
          </Flex>
        </Center>
      </Text>
    </footer>
  )
}

export default Footer
