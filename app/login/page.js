import React from 'react'
import './style.css'
import Link from 'next/link'
import Form from './components/Form'
import BackButton from './components/BackButton'

export const metadata = {
    title: "Login - Ordion",
    description: "Log in to your Ordion account. Manage your e-commerce website and access powerful tools to grow your online business.",
    keywords: "login, sign in, Ordion login, e-commerce login, access account, manage website",
    alternates: {
        canonical: "https://ordion.io/login",
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
        title: 'Login - Ordion',
        description: "Log in to your Ordion account. Manage your e-commerce website and access powerful tools to grow your online business.",
        images: [
            {
                url: 'https://ordion.io/seo_banner.jpg',
                alt: 'Ordion Login Seo Banner',
                width: 1200,
                height: 630,
            }
        ],
        locale: 'en_US',
        type: 'website',
    },
    openGraph: {
        title: 'Login - Ordion',
        description: "Log in to your Ordion account. Manage your e-commerce website and access powerful tools to grow your online business.",
        url: 'https://ordion.io/login',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: 'https://ordion.io/seo_banner.jpg',
                alt: 'Ordion Login Seo Banner',
                width: 1200,
                height: 630,
            }
        ],
        site_name: 'Ordion',
    },
};


const page = () => {
    return (
        <div id='login_master'>

            <Form />

            <BackButton />
        </div>
    )
}

export default page
