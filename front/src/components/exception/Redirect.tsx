/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface Props {
  message: string;
}

export default function Redirect({ message }: Props) {
  const router = useRouter();

  useEffect(() => {
    toast.error(message, {
      onClose: () => router.back(),
    });
  }, []);

  return <></>;
}
