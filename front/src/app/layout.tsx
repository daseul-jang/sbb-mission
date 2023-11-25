import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReactQueryProvider from '@/context/ReactQueryProvider';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SBB',
  description: 'SBB Board',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReactQueryProvider>
          <header className='sticky top-0 bg-white border-b z-[999]'>
            <div className='max-w-screen-lg mx-auto'>
              <Navbar />
            </div>
          </header>
          <main className='w-full flex justify-center max-w-screen-lg mx-auto'>
            {children}
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
