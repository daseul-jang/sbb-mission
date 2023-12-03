import { AuthUser } from '@/model/user';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
  }

  interface Session extends DefaultSession {
    user: AuthUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: AuthUser;
  }
}
