'use client';

import NavbarButton from './ui/button/NavbarButton';
import SearchIcon from './ui/icon/SearchIcon';
import Dropdown from './ui/dropdown/Dropdown';

export default function Navbar() {
  return (
    <nav className='navbar bg-base-100'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl'>SBB</a>
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
