import { LoginInfo, SignupInfo } from '@/model/user';
import { postFetch } from '@/config/fetch-config';
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

export const userLogin = async (
  user: LoginInfo,
  csrfToken?: string | undefined
) => {
  console.log('userLogin');
  console.log(user);
  console.log(csrfToken);

  try {
    /* const data = await loginFetch(`${AUTH_URL}/login`, {
      body: JSON.stringify(user),
    }).then((res) => res.json()); */

    const data = await fetch(`${AUTH_URL}/login`, {
      headers: {
        'Content-Type': 'application/json',
        //'X-XSRF-TOKEN': csrfToken || '',
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(user),
    }).then((res) => res.json());

    return data;
  } catch (err) {
    console.log('로그인 실패');
  }
};

export const addUser = async (user: SignupInfo) => {
  try {
    const data = await fetch(`${USER_URL}/signup`, {
      ...FETCH_OPTION,
      method: 'POST',
      body: JSON.stringify(user),
    }).then((res) => res.json());
    console.log(data);

    return data;
  } catch (err) {}
};
