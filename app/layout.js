import { Inter, Poppins, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Provider } from "./AppContext";
import LoaderProvider from './LoaderProvider';
import Script from 'next/script';

export const dynamic = 'force-dynamic'

const inter = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const source_sans_3 = Source_Sans_3({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: '--font-source-sans-3',
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: '--font-poppins',
});

export const metadata = {
  title: "",
  description: "",
  keywords: "",
  alternates: {
    canonical: "",
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  charset: "UTF-8",
  language: "en",
  author: "",
  publisher: "",
  applicationName: "",
  twitter: {
    card: 'summary_large_image',
    title: '',
    description: "",
    images: [
      {
        url: '',
        alt: '',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  openGraph: {
    title: '',
    description: "",
    url: '',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '',
        alt: '',
        width: 1200,
        height: 630,
      }
    ],
    site_name: '',
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-B3FZ056QG9'
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-B3FZ056QG9');
      `}
      </Script>
      <body className={`${poppins.variable} ${source_sans_3.variable}`}>
        <LoaderProvider>
          <Provider>
            {children}
          </Provider>
        </LoaderProvider>
      </body>
    </html>
  );
}
