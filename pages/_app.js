import '@/styles/globals.css'
import {NextUIProvider} from "@nextui-org/react";
import Head from 'next/head';

import { useEffect } from 'react';
import 'react-quill/dist/quill.snow.css'
import { Toaster } from 'react-hot-toast';
import { NMNContextProvider } from '@/components/NMNContext';

import { posthog } from 'posthog-js';
import { useRouter } from 'next/router';
import {PostHogProvider} from 'posthog-js/react'

export default function App({ Component, pageProps }) {

const router = useRouter()

useEffect(()=>{
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY,{
    api_host:process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles:'always',
    loaded:(posthog)=>{
      if(process.env.NODE_ENV == "development") posthog.debug()
    }
  })

  const handleRouteChange = () => posthog?.capture('$pageview')
  router.events.on('routeChangeComplete',handleRouteChange)

  return ()=>{
  router.events.off('routeChangeComplete',handleRouteChange)
  }
},[])

  return <NextUIProvider>
    <Head>
    <link rel="icon" href="/favicon_clat.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;700;800&display=swap" rel="stylesheet"/>
    </Head>

 <PostHogProvider client={posthog}>
    <Toaster position="bottom-right" toastOptions={{className:" font-sans text-sm",duration: 2000}}></Toaster>
    <NMNContextProvider>
    <Component {...pageProps} /></NMNContextProvider></PostHogProvider></NextUIProvider>
}
