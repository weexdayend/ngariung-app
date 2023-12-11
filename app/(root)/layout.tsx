import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '../globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from "@clerk/themes";

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
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <TopBar />
          
            <main className="flex flex-row">
              <LeftSidebar />
                
                <section className="main-container">
                  <div className="w-full max-w-4xl">
                    {children}
                    <SpeedInsights />
                    <Analytics />
                  </div>
                </section>

              <RightSidebar />
            </main>

          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  )
}
