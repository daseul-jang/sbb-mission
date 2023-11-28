type Props = {
  children: React.ReactNode;
};

export default function BgImageDiv({ children }: Props) {
  return (
    <div
      className='-mt-[67px] relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover'
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1577554105754-602c7bc6adaa?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      <div className='absolute bg-white opacity-60 inset-0 z-0'></div>
      <div className='mt-16 max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10'>
        {children}
      </div>
    </div>
  );
}
