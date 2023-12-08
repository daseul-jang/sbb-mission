import { LoginInfo, SignupInfo } from '@/model/user';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const USER_URL = 'http://localhost:8080/user';
const AUTH_URL = 'http://localhost:8080/auth';
const FETCH_OPTION: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
  cache: 'no-store',
};

export const getNewAccessToken = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  try {
    const res = await fetch(`${AUTH_URL}/reissue-access-token`, {
      headers: {
        'Content-Type': 'text/plain',
      },
      method: 'POST',
      body: user?.refreshToken,
    });

    const { objectData } = await res.json();

    if (user) {
      user.accessToken = objectData.accessToken;
    }

    return user;
  } catch (err) {
    throw new Error('토큰 발급 실패');
  }
};

export const userLogin = async (user: LoginInfo) => {
  try {
    const data = await fetch(`${AUTH_URL}/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(user),
    }).then((res) => res.json());

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const addUser = async (user: SignupInfo) => {
  try {
    const res = await fetch(`${USER_URL}/signup`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    });

    /* if (!res.ok) {
      console.log(res);
      throw new Error('회원가입 오류');
    } */

    const data = await res.json();
    console.log(data);

    return data;
  } catch (err) {
    console.log('회원가입 실패');
    console.log(err);

    return err;
  }
};
