import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/bootstrap/css/bootstrap.css";
import { MongoClient } from 'mongodb';

declare module "*.png" {
  const value: any;
}

<<<<<<< HEAD
const MyApp = async ({ Component, pageProps }: AppProps) => {
  return (
      <Component className="bg-transperent" {...pageProps} />
  );
};
=======
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
>>>>>>> parent of ad52fbf... Added Full post page to site.

export default MyApp;
