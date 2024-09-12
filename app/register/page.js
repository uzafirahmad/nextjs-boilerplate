import React from 'react'
import './style.css'
import Link from 'next/link'
import Form from './components/Form'
import BackButton from './components/BackButton'

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


const page = () => {
    return (
        <div id='register_master'>
            <Form />
            <BackButton />
        </div>
    )
}

export default page
