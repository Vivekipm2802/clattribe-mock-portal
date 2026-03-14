import '@/styles/globals.css'
import {NextUIProvider} from "@nextui-org/react";
import Head from 'next/head';

import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { NMNContextProvider } from '@/components/NMNContext';

import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {

const router = useRouter()
const [posthogLoaded, setPosthogLoaded] = useState(false)

// Lazy-load PostHog — defer analytics so it doesn't block initial render
useEffect(()=>{
  const timer = setTimeout(() => {
    import('posthog-js').then(({ default: posthog }) => {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY,{
        api_host:process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        person_profiles:'always',
        loaded:(posthog)=>{
          if(process.env.NODE_ENV == "development") posthog.debug()
        }
      })

      const handleRouteChange = () => posthog?.capture('$pageview')
      router.events.on('routeChangeComplete',handleRouteChange)
      setPosthogLoaded(true)
    })
  }, 3000) // Delay PostHog by 3 seconds so page loads fast first

  return () => clearTimeout(timer)
},[])

  return <NextUIProvider>
    <Head>
    <link rel="icon" href="/favicon_clat.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet"/>
    </Head>

    <Toaster position="bottom-right" toastOptions={{className:" font-sans text-sm",duration: 2000}}></Toaster>
    <NMNContextProvider>
    <Component {...pageProps} /></NMNContextProvider></NextUIProvider>
}
