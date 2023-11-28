'use client';

import NavbarButton from './button/NavbarButton';
import SearchIcon from './icon/SearchIcon';
import Dropdown from './dropdown/Dropdown';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();
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
        <Dropdown type='avatar' />
        <Link href='/user/signin' className='btn text-sm'>로그인 / 가입</Link>
      </div>
    </nav>
  );
}
