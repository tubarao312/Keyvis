'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Logo } from '@/components/Logo'
import { Navigation } from '@/components/Navigation'
import { type Section, SectionProvider } from '@/components/SectionProvider'

import { HeroPattern } from '@/components/HeroPattern'

export function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="h-full ">
      <HeroPattern />
      <motion.header
        layoutScroll
        className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
      >
        <Header />
      </motion.header>
      <div className="relative mx-auto flex h-full w-full max-w-2xl flex-col px-4 pt-14 sm:px-6 lg:max-w-5xl lg:px-8">
        <main className="flex-auto">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
