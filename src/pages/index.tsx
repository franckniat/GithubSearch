import { NextSeo } from 'next-seo';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { ChevronUpSquare, Code } from 'lucide-react';

export default function Home() {
  return (
    <>
      <NextSeo
        title="Home"
        description="Main Page of GithubApi"
      />
      <Navigation />
      <main className='max-w-[700px] mx-auto px-2 pt-[90px]'>
        <section className='mt-5 max-w-xl mx-auto'>
          <h1 className='font-extrabold text-2xl tracking-tight my-3 text-center'>Welcome to Github API </h1>
          <p className='text-lg leading-6 text-center'>
            The GitHub Explorer app harnesses GitHub{"'"}s API to enable streamlined searches for users, repositories, and organizations. This tool offers real-time access to specific GitHub information. With its user-friendly interface, it delivers clear and concise results, allowing users to easily access key statistics and details about users, repositories, and organizations on the GitHub platform.
          </p>
          <section className='flex items-center justify-center my-4 gap-5'>
            <Link href='/users' className='px-3 py-2 gap-1 flex items-center rounded bg-sky-600 text-white hover:bg-sky-600/90'>Get Started
            </Link>
            <Link href="" className='flex items-center gap-1 rounded dark:bg-neutral-50 bg-neutral-800 text-white dark:text-black hover:bg-neutral-800/90 dark:hover:bg-neutral-50/90 px-3 py-2'>Code source <Code/>
            </Link>
          </section>
        </section>
      </main>
    </>
  )
}
