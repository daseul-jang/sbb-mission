import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ReactQueryProvider from '@/context/ReactQueryProvider';
import Navbar from '@/components/ui/Navbar';
import AuthProvider from '@/context/AuthProvider';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'SBB',
    template: 'SBB | %s',
  },
  description: 'SBB Board',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} flex flex-col justify-start min-h-screen`}
      >
        <ToastContainer
          position='top-center'
          autoClose={2000}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
        <AuthProvider>
          <ReactQueryProvider>
            <header className='sticky top-0 bg-white border-b z-[999]'>
              <div className='max-w-screen-lg mx-auto'>
                <Navbar />
              </div>
            </header>
            <main className='max-sm:max-w-screen-sm'>{children}</main>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
