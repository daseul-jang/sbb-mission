import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'force-cache',
  },
});

export const unsplashAxios = axios.create({
  baseURL: 'https://api.unsplash.com/photos',
  headers: {
    Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
  },
});

export default instance;
