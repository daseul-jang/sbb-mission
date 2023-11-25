import { DropdownType, NavbarType } from '@/types/customTypes';

export default function DropdownMenu({ children, type }: NavbarType) {
  return (
    <div tabIndex={0} className={getStyle(type)}>
      {children}
    </div>
  );
}

const getStyle = (type: DropdownType) => {
  const baseStyle = 'dropdown-content mt-3 z-[1] w-52 bg-base-100 shadow';

  switch (type) {
    case 'notification':
      return `card card-compact ${baseStyle}`;
    case 'avatar':
      return `menu menu-sm rounded-box p-2 ${baseStyle}`;
    default:
      break;
  }
};
