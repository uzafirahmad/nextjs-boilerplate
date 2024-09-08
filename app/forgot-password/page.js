import React from 'react'
import './style.css'
import Link from 'next/link'
import Form from './components/Form'
import BackButton from './components/BackButton'

export const metadata = {
    title: "Forgot Password - Ordion",
    description: "Recover your password for Ordion. Follow the steps to reset your password and regain access to your account.",
    keywords: "forgot password, reset password, recover password, Ordion password recovery",
    alternates: {
        canonical: "https://ordion.io/forgot-password",
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
        title: 'Forgot Password - Ordion',
        description: "Recover your password for Ordion. Follow the steps to reset your password and regain access to your account.",
        images: [
            {
                url: 'https://ordion.io/seo_banner.jpg',
                alt: 'Ordion Forgot Password Seo Banner',
                width: 1200,
                height: 630,
            }
        ],
        locale: 'en_US',
        type: 'website',
    },
    openGraph: {
        title: 'Forgot Password - Ordion',
        description: "Recover your password for Ordion. Follow the steps to reset your password and regain access to your account.",
        url: 'https://ordion.io/forgot-password',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: 'https://ordion.io/seo_banner.jpg',
                alt: 'Ordion Forgot Password Seo Banner',
                width: 1200,
                height: 630,
            }
        ],
        site_name: 'Ordion',
    },
};


const page = () => {
    return (
        <div id='forgot_password_master'>
            <div id='forgot_password_child'>
                <h2 id='forgot_password_h2'>Forgot Password</h2>
                <Form />
            </div>
            <BackButton />
        </div>
    )
}

export default page
