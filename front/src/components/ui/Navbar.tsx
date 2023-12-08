'use client';

import NavbarButton from './button/NavbarButton';
import SearchIcon from './icon/SearchIcon';
import Dropdown from './dropdown/Dropdown';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const router = useRouter();

  console.log(session);

  return (
    <nav className='navbar bg-base-100'>
      <div className='flex-1'>
        <h1
          className='text-2xl font-bold px-3 hover:cursor-pointer hover:text-amber-500'
          onClick={() => router.replace('/')}
        >
          SBB
        </h1>
      </div>
      <div className='flex-none'>
        <NavbarButton>
          <SearchIcon />
        </NavbarButton>
        <Dropdown type='notification' />
        {status === 'loading' ? (
          <button className='btn' disabled>
            <span className='loading loading-spinner'></span>
          </button>
        ) : status === 'authenticated' ? (
          <>
            <Dropdown type='avatar' />
            <button className='btn text-sm' onClick={() => signOut()}>
              로그아웃
            </button>
          </>
        ) : (
          <button className='btn text-sm' onClick={() => signIn()}>
            로그인/가입
          </button>
        )}
      </div>
    </nav>
  );
}
