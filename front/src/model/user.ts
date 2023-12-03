export interface BaseUser {
  id?: number;
  username: string;
  password: string;
  passwordCheck?: string;
  email?: string;
  createDate?: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  createDate: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginInfo extends Pick<BaseUser, 'username' | 'password'> {}
export interface SignupInfo
  extends Pick<BaseUser, 'username' | 'password' | 'passwordCheck' | 'email'> {}

export interface RefreshToken {
  id: number;
  token: string;
  expiryDate: string;
  createDate: string;
  updateDate: string;
  //user: User;
}

export interface TokenUser {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
  refreshToken: RefreshToken;
  createDate: string;
}
