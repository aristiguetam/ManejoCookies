import '@/styles/globals.css'
import { useEffect, useState } from 'react';
import type { AppContext, AppProps } from 'next/app'

import { CssBaseline, Theme, ThemeProvider } from '@mui/material';

import { darkTheme, lightTheme, customTheme } from '../themes';
import Cookies from 'js-cookie';

interface Props extends AppProps {
  theme: string;
}

export default function App({ Component, pageProps, theme = 'dark' }: Props) {

  const [currenTheme, setCurrenTheme] = useState(lightTheme);

  useEffect(() => {

    const cookiesTheme = Cookies.get('theme') || 'light';
    const selectedTheme: Theme = cookiesTheme === 'light'
      ? lightTheme
      : cookiesTheme === 'dark'
        ? darkTheme
        : customTheme;

    setCurrenTheme(selectedTheme);
  }, [])



  return (
    <ThemeProvider theme={currenTheme} >
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}


// App.getInitialProps = async (appContext: AppContext) => {

//   const { theme } = appContext.ctx.req ? (appContext.ctx.req as any).cookies : { theme: 'light' }

//   const validThemes = ['light', 'dark', 'custom'];

//   // console.log("GetInitialProps:", cookies)

//   return {
//     theme: validThemes.includes(theme) ? theme : 'dark',
//   }


// }