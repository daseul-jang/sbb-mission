import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginInfo } from '@/model/user';
import { userLogin } from '@/service/user';
import { ErrorResponseDto, ValidError } from '@/model/common';

const handleErrorData = (errorData: ErrorResponseDto) => {
  const { validError, errorMessage } = errorData;

  if (validError) throw new Error(getValidErrorMessage(validError));
  if (errorMessage) throw new Error(`${errorMessage} 😅`);
};

const getValidErrorMessage = (validError: ValidError) => {
  return validError.username && validError.password
    ? '아이디와 비밀번호는 필수 항목입니다.'
    : validError.username || validError.password;
};

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
        const res = await userLogin({ username, password });

        if (res?.errorData) handleErrorData(res.errorData);

        if (res?.objectData) return res.objectData;
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
      if (token?.user) {
        session.user = token.user;
      }

      return session;
    },
  },
  pages: {
    signIn: '/user/signin',
    //error: '/user/error',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
