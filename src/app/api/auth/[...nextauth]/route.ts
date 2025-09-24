import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// List of allowed emails - Add your team emails here
const ALLOWED_EMAILS = [
    'camilor67@gmail.com',
    'jross@resulta.com'
  // Add more emails here
]

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if email is in the allowed list
      if (user.email && ALLOWED_EMAILS.includes(user.email)) {
        return true
      } else {
        // Email not allowed
        return false
      }
    },
    async session({ session, token }) {
      return session
    },
    async jwt({ token, account, profile }) {
      return token
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
})

export { handler as GET, handler as POST }
