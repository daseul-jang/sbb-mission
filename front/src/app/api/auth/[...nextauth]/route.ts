import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginInfo } from '@/model/user';
import { userLogin } from '@/service/user';
import { cookies } from 'next/headers';
import { stringify } from 'querystring';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  /* cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
      },
    },
  }, */
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as LoginInfo;
        /* const csrfToken = cookies()
          .get('next-auth.csrf-token')
          ?.value.split('|')[0]; */

        try {
          const res = await userLogin(
            {
              username,
              password,
            }
            //csrfToken
          );

          return res;
        } catch (err) {
          console.log(err);

          return err;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      //const { id, username, email, createDate } = user?.user;

      if (!user || user?.cause || user?.errorData) {
        console.log('콜백오류');

        return false;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user?.objectData) {
        const resUser = user?.objectData;

        token.user = {
          ...resUser.user,
          accessToken: resUser.accessToken,
          refreshToken: resUser.refreshToken,
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }

      return session;
    },
  },
  pages: {
    signIn: '/user/signin',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
