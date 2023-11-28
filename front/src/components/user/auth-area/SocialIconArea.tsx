import SocialRoundIcon from '@/components/ui/icon/SocialRoundIcon';

export default function SocialIconArea() {
  return (
    <>
      <div className='flex flex-row justify-center items-center space-x-3'>
        <SocialRoundIcon socialType='facebook' />
        <SocialRoundIcon socialType='twitter' />
        <SocialRoundIcon socialType='linkedin' />
      </div>
      <div className='flex items-center justify-center space-x-2'>
        <span className='h-px w-16 bg-gray-300'></span>
        <span className='text-gray-500 font-normal'>OR</span>
        <span className='h-px w-16 bg-gray-300'></span>
      </div>
    </>
  );
}
