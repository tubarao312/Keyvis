"use client";

import React from 'react'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
        <Providers>
          <div className="w-full">
            <Layout>
              {children}
            </Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}

