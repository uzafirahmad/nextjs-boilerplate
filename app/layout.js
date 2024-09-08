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
  title: "Ordion",
  description: "Ordion allows you to create your own e-commerce website. Start selling online with powerful tools designed to help you grow your business.",
  keywords: "Ordion, e-commerce platform, create online store, build e-commerce website, e-commerce templates, online shop builder, start selling online, e-commerce tools, website builder, online business, e-commerce solution",
  alternates: {
    canonical: "https://ordion.io",
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  charset: "UTF-8",
  language: "en",
  author: "Ordion Team",
  publisher: "Ordion Inc.",
  applicationName: "Ordion",
  twitter: {
    card: 'summary_large_image',
    title: 'Ordion',
    description: "Ordion allows you to create your own e-commerce website. Start selling online with powerful tools designed to help you grow your business.",
    images: [
      {
        url: 'https://ordion.io/seo_banner.jpg',
        alt: 'Ordion Seo Banner',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  openGraph: {
    title: 'Ordion',
    description: "Ordion allows you to create your own e-commerce website. Start selling online with powerful tools designed to help you grow your business.",
    url: 'https://ordion.io',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://ordion.io/seo_banner.jpg',
        alt: 'Ordion Seo Banner',
        width: 1200,
        height: 630,
      }
    ],
    site_name: 'Ordion',
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
