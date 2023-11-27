'use client';

import NavbarButton from './button/NavbarButton';
import SearchIcon from './icon/SearchIcon';
import Dropdown from './dropdown/Dropdown';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className='navbar bg-base-100'>
      <div className='flex-1'>
        <button
          className='btn btn-ghost text-xl'
          onClick={() => router.replace('/')}
        >
          SBB
        </button>
      </div>
      <div className='flex-none'>
        <NavbarButton>
          <SearchIcon />
        </NavbarButton>
        <Dropdown type='notification' />
        <Dropdown type='avatar' />
      </div>
    </nav>
  );
}
