import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '../styles/bootstrap/css/bootstrap.css';

declare module "*.png" {
  const value: any;
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component className="bg-transperent" {...pageProps} />
}

export default MyApp;
