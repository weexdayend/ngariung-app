import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import { dark, neobrutalism } from "@clerk/themes"

import '../globals.css'

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
    title: 'Ngariung',
    description: 'A Next.js 13 Meta Ngariung Application'
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang='en'>
                <body className={`${inter.className}`}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}