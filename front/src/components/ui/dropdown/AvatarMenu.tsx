import { SetIsDropdownType } from './NotificationMenu';

export default function AvatarMenu({ setIsDropdown }: SetIsDropdownType) {
  return (
    <ul>
      <li onClick={() => setIsDropdown(false)}>
        <a className='justify-between'>
          Profile
          <span className='badge'>New</span>
        </a>
      </li>
      <li onClick={() => setIsDropdown(false)}>
        <a>Settings</a>
      </li>
      <li onClick={() => setIsDropdown(false)}>
        <a>Logout</a>
      </li>
    </ul>
  );
}
