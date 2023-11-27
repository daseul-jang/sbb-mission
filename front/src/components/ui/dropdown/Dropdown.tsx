import { useState } from 'react';
import { NavbarType } from '@/types/customTypes';
import NotificationMenu from '@/components/ui/dropdown/NotificationMenu';
import AvatarMenu from '@/components/ui/dropdown/AvatarMenu';
import NavbarButton from '../button/NavbarButton';
import NotificationIcon from '../icon/NotificationIcon';
import AvatarIcon from '../icon/AvatarIcon';
import DropdownMenu from './DropdownMenu';

export default function Dropdown({ type }: NavbarType) {
  const [isDropdown, setIsDropdown] = useState(false);

  const handleOutsideClick = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDropdown(false);
    }
  };

  const handleToggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  return (
    <div className='dropdown dropdown-end' onBlur={handleOutsideClick}>
      <NavbarButton type={type} handleToggleDropdown={handleToggleDropdown}>
        {(type === 'notification' && <NotificationIcon />) ||
          (type === 'avatar' && <AvatarIcon />)}
      </NavbarButton>
      {isDropdown && (
        <DropdownMenu type={type}>
          {(type === 'notification' && (
            <NotificationMenu setIsDropdown={setIsDropdown} />
          )) ||
            (type === 'avatar' && <AvatarMenu setIsDropdown={setIsDropdown} />)}
        </DropdownMenu>
      )}
    </div>
  );
}
