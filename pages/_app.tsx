import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/bootstrap/css/bootstrap.css";
import { MongoClient } from 'mongodb';

declare module "*.png" {
  const value: any;
}

const MyApp = async ({ Component, pageProps }: AppProps) => {
  return (
      <Component className="bg-transperent" {...pageProps} />
  );
};

export default MyApp;
