'use client';

import useRandomImage from '@/hooks/unsplash';
import LoadingSpinnerCircle from '../icon/LoadingSpinnerCircle';
import CommonException from '@/components/error/CommonException';

export default function RandomImage() {
  const { randomImage, isLoading, isError, error } = useRandomImage();

  if (isLoading) {
    return <LoadingSpinnerCircle />;
  }

  if (isError) {
    return <CommonException msg='이미지 로딩 에러' />;
  }

  console.log(randomImage);

  return <div>랜덤이미지</div>;
}
