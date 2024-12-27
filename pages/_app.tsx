// pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this is added at the top
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
