import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local'
import { SearchProvider } from '@/context/SearchContext';
import {NextUIProvider} from "@nextui-org/react";

const dmSans = localFont({
  src : '../fonts/DMSans-VariableFont_opsz,wght.ttf',
  variable: "--font-dm-sans"
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SearchProvider>
      <ThemeProvider defaultTheme='system' attribute='class' enableSystem>
        <NextUIProvider>
          <main className={`${dmSans.className} font-sans`}>
            <Component {...pageProps} />
          </main>
        </NextUIProvider>
      </ThemeProvider>
    </SearchProvider>
  
  )
}
