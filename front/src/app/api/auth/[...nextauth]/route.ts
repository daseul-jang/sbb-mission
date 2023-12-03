import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginInfo } from '@/model/user';
import { userLogin } from '@/service/user';
import { cookies } from 'next/headers';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as LoginInfo;
        /* const csrfToken = cookies()
          .get('next-auth.csrf-token')
          ?.value.split('|')[0]; */
        const res = await userLogin(
          {
            username,
            password,
          }
          //csrfToken
        );

        return res?.objectData;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          ...user.user,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      }

      return token;
    },
    async session({ session, token }) {
      session.user = { ...token?.user };
      return session;
    },
  },
  pages: {
    signIn: '/user/signin',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
