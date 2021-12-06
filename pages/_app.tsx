import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@grikomsn/cal-sans";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="font-sans">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
