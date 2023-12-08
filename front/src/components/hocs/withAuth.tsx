/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoadingSpinnerCircle from '../ui/icon/LoadingSpinnerCircle';

export default function withAuth(Component: React.ComponentType) {
  return (props: Record<string, unknown>) => {
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
      setTimeout(() => {
        if (!session) {
          alert('로그인이 필요한 서비스입니다.');
          router.back();
        }
      }, 1000);
    }, [session]);

    if (!session?.user) {
      return <LoadingSpinnerCircle />;
    }

    return <Component {...props} />;
  };
}
