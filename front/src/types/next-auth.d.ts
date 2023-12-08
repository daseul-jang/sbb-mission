import { ErrorResponseDto } from '@/model/common';
import { AuthUser } from '@/model/user';
import { DefaultSession, DefaultUser } from 'next-auth';
import { SignInResponse } from 'next-auth/react';

declare module 'next-auth' {
  interface User {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
    cause?: {
      errno: number;
      code: string;
      syscall: string;
      address: string;
      port: number;
    };
    errorData?: ErrorResponseDto;
  }

  interface Session extends DefaultSession {
    user: AuthUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: AuthUser;
  }

  interface User {
    user: AuthUser;
  }
}

declare module 'next-auth/react' {
  interface SignInResponse extends SignInResponse {
    errorData: {
      errorStatus: number;
      errorMessage: string;
    };
  }
}
