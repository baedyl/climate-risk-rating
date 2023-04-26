'use client';

import React from 'react'
import { NativeBaseProvider } from "native-base";

function MyApp({ Component, pageProps }) {
  return (
    <NativeBaseProvider>
      <Component {...pageProps} />
    </NativeBaseProvider>
  );
}

export default MyApp;
