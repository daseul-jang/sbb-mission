import { Dispatch, SetStateAction } from 'react';

export type SetIsDropdownType = {
  setIsDropdown: Dispatch<SetStateAction<boolean>>;
};

export default function NotificationMenu({ setIsDropdown }: SetIsDropdownType) {
  return (
    <div className='card card-compact'>
      <div className='card-body'>
        <span className='font-bold text-lg'>8 Items</span>
        <span className='text-info'>Subtotal: $999</span>
        <div className='card-actions'>
          <button className='btn btn-primary btn-block'>View cart</button>
        </div>
      </div>
    </div>
  );
}
