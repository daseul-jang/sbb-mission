import { unsplashAxios } from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';

const fetchUnsplash = async (count: number) => {
  // 랜덤 이미지 api
  /* const {
    data: { urls: raw },
  } = await unsplashAxios.get('/random'); */

  // 랜덤 이미지 10개 가져오기
  const { data } = await unsplashAxios.get(`/random?count=${count}`);

  return data;
};

export default function useRandomImage(count: number) {
  const {
    data: randomImages,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['randomImage', count],
    queryFn: () => fetchUnsplash(count),
    refetchInterval: 6000000,
  });

  return { randomImages, isLoading, isError, error };
}
