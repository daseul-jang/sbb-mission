'use client';

import useRandomImage from '@/hooks/unsplash';
import { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface Image {
  id: string;
  url: string;
}

export default function BgImageDiv({ children }: Props) {
  const defaultImage =
    'https://images.unsplash.com/photo-1577554105754-602c7bc6adaa?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  /* const { randomImages, isLoading, isError, error } = useRandomImage(30);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % randomImages.length);
    }, 600000);

    return () => {
      clearTimeout(interval);
    };
  }, [currentIndex, randomImages]);

  if (isLoading) {
    return <>로딩중</>;
  }

  const currentImage = randomImages[currentIndex]?.urls.raw || defaultImage;

  if (!currentImage) {
    return null;
  }

  console.log(currentImage); */

  return (
    <div
      className={`-mt-[67px] relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover`}
      style={{ backgroundImage: `url(${defaultImage})` }}
    >
      <div className='absolute bg-white opacity-60 inset-0 z-0'></div>
      <div className='mt-16 max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10'>
        {children}
      </div>
    </div>
  );
}
