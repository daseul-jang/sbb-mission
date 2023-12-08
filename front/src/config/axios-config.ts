import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
});

export const unsplashAxios = axios.create({
  baseURL: 'https://api.unsplash.com/photos',
  headers: {
    Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
  },
});

export default instance;
