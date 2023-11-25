import Image from 'next/image';

export default function AvatarIcon() {
  return (
    <div className='w-10 rounded-full'>
      <Image
        alt='Tailwind CSS Navbar component'
        src='/img/default-profile-img.png'
        fill
      />
    </div>
  );
}
