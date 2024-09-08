import React from 'react'
import './style.css'
import Link from 'next/link'
import Form from './components/Form'
import BackButton from './components/BackButton'

export const metadata = {
    title: "Register - Ordion",
    description: "Sign up for Ordion to create your own e-commerce website. Start selling online with powerful tools designed to help you grow your business.",
    keywords: "register, sign up, create account, Ordion registration, e-commerce platform, start selling online",
    alternates: {
        canonical: "https://ordion.io/register",
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
        title: 'Register - Ordion',
        description: "Sign up for Ordion to create your own e-commerce website. Start selling online with powerful tools designed to help you grow your business.",
        images: [
            {
                url: 'https://ordion.io/seo_banner.jpg',
                alt: 'Ordion Register Seo Banner',
                width: 1200,
                height: 630,
            }
        ],
        locale: 'en_US',
        type: 'website',
    },
    openGraph: {
        title: 'Register - Ordion',
        description: "Sign up for Ordion to create your own e-commerce website. Start selling online with powerful tools designed to help you grow your business.",
        url: 'https://ordion.io/register',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: 'https://ordion.io/seo_banner.jpg',
                alt: 'Ordion Register Seo Banner',
                width: 1200,
                height: 630,
            }
        ],
        site_name: 'Ordion',
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
