import { type Metadata } from 'next'
import glob from 'fast-glob'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { type Section } from '@/components/SectionProvider'

import {
  PlusCircleIcon,
  TrashIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Protocol API Reference',
    default: 'Protocol API Reference',
  },
}

export default async function RootLayout({}: {}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
        <Providers>
          <div className="w-full">
            <Layout>
              <div className="h-10" />
              <div className="flex flex-col gap-8">
                <div className="flex flex-col rounded-lg bg-zinc-600/10 px-5 py-5 shadow-xl ring-1 ring-inset backdrop-blur-sm transition-all duration-75 ease-in-out dark:ring-white/10 dark:hover:bg-zinc-600/[0.12] dark:hover:ring-white/20 ">
                  <span className="flex flex-row gap-1.5">
                    <h2 className="text-lg font-semibold">Algorithm Hops:</h2>
                    <h2 className="text-lg font-semibold text-emerald-400">
                      3
                    </h2>
                  </span>
                  <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                    How many hops the Ward Analytics algorithm will look for
                    between blockchan transactions.
                  </p>
                  <div className="mt-3 h-[1px] bg-zinc-600/20 dark:bg-zinc-400/20" />
                  <span className=" mt-3 flex flex-row gap-1.5">
                    <span className="my-auto inline-flex h-fit rounded-full bg-red-400/10 px-3 py-[0.09rem] text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">
                      Dangerous
                    </span>
                    <span className="my-auto inline-flex h-fit  rounded-full bg-sky-400/10 px-3 py-[0.09rem] text-xs font-medium text-sky-400 ring-1 ring-inset ring-sky-400/20">
                      Performance
                    </span>
                    <PlusCircleIcon className="my-auto h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                    <span className="my-auto ml-auto flex flex-row gap-0.5">
                      <TrashIcon className="h-9 w-9 rounded-md p-2 text-zinc-600 transition-all duration-75 ease-in-out hover:bg-zinc-400/10 dark:text-zinc-400" />
                      <PencilIcon className="h-9 w-9 rounded-md p-2 text-zinc-600 transition-all duration-75 ease-in-out hover:bg-zinc-400/10 dark:text-zinc-400" />
                    </span>
                  </span>
                </div>
                <div className="flex flex-col rounded-lg bg-zinc-600/10 px-5 py-5 shadow-xl ring-1 ring-inset backdrop-blur-sm transition-all duration-75 ease-in-out dark:ring-white/10 dark:hover:bg-zinc-600/[0.12] dark:hover:ring-white/20 ">
                  <span className="flex flex-row gap-1.5">
                    <h2 className="text-lg font-semibold">OpenAI Model:</h2>
                    <h2 className="text-lg font-semibold text-emerald-400">
                      gpt-3.5-turbo
                    </h2>
                  </span>
                  <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                    Model used for processing financial reports. Tune for better
                    performance and cost saving.
                  </p>
                  <div className="mt-3 h-[1px] bg-zinc-600/20 dark:bg-zinc-400/20" />
                  <span className=" mt-3 flex flex-row gap-1.5">
                    <span className="my-auto inline-flex h-fit rounded-full bg-orange-400/10 px-3 py-[0.09rem] text-xs font-medium text-orange-400 ring-1 ring-inset ring-orange-400/20">
                      Sensitive
                    </span>

                    <PlusCircleIcon className="my-auto h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                    <span className="my-auto ml-auto flex flex-row gap-0.5">
                      <TrashIcon className="h-9 w-9 rounded-md p-2 text-zinc-600 transition-all duration-75 ease-in-out hover:bg-zinc-400/10 dark:text-zinc-400" />
                      <PencilIcon className="h-9 w-9 rounded-md p-2 text-zinc-600 transition-all duration-75 ease-in-out hover:bg-zinc-400/10 dark:text-zinc-400" />
                    </span>
                  </span>
                </div>
              </div>
            </Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
