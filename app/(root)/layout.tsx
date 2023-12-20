import { Inter } from 'next/font/google'

import '../globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { shadesOfPurple } from "@clerk/themes";

import TopBar from '@/components/shared/TopBar';
import RightSidebar from '@/components/shared/RightSidebar';
import BottomBar from '@/components/shared/BottomBar';
import LeftSidebar from '@/components/shared/LeftSidebar';

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ngariung',
  description: 'A Next.js 13 Meta Ngariung Application'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <TopBar />
          
            <main className="flex flex-row">
              <LeftSidebar />
                
                <section className="main-container">
                  <div className="w-full max-w-screen">
                    {children}
                  </div>
                </section>

              {/* <RightSidebar /> */}
            </main>

            <footer className="pb-24">
              {/* Powered By */}
              <div className='flex flex-col md:flex-col lg:flex-row xl:flex-row justify-center text-center items-center py-5 px-6 border-t border-gray-100'>
                <p className='text-xs text-blue-950/20'>Powered By&nbsp;</p>
                <h1 className='text-base text-blue-950/30 font-extrabold'>SAKA GROUP&nbsp;</h1>
                <p className='text-xs text-blue-950/20'>Copyrights &#169; 2023 All rights reserved.</p>
              </div>
            </footer>

          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  )
}
