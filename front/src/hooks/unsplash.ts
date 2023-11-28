import { unsplashAxios } from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';

const fetchUnsplash = async () => {
  const res = await unsplashAxios.get('/random');

  console.log(res);

  return res;
};

export default function useRandomImage() {
  const {
    data: randomImage,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['randomImage'],
    queryFn: fetchUnsplash,
    refetchInterval: 30000,
  });

  return { randomImage, isLoading, isError, error };
}
