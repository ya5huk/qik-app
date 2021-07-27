import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '../styles/bootstrap/css/bootstrap.css';

declare module "*.png" {
  const value: any;
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp;
