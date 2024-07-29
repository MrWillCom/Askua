import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import Resend from 'next-auth/providers/resend'
import { render } from '@react-email/render'
import VerificationRequestEmail from './emails/VerificationRequestEmail'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      from: 'Askua <noreply@mrwillcom.com>',
      sendVerificationRequest: async ({ identifier, provider, url }) => {
        const { host } = new URL(url)

        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${provider.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: provider.from,
            to: identifier,
            subject: `Sign in to Askua`,
            html: render(<VerificationRequestEmail url={url} host={host} />, {
              pretty: true,
            }),
            text: `Sign in to Askua (${host})\n${url}\n\n`,
          }),
        })

        if (!res.ok)
          throw new Error('Resend error: ' + JSON.stringify(await res.json()))
      },
    }),
  ],
  pages: { signIn: '/sign-in' },
})
