'use client'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { useEffect } from 'react';

const Client = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const accessToken = searchParams.get('accessToken')
        const refreshToken = searchParams.get('refreshToken')

        if (accessToken && refreshToken) {
            setCookie('accessToken', accessToken)
            setCookie('refreshToken', refreshToken)
            router.push('/')
        } else {
            router.push('/login?error=google_auth_failed')
        }
    }, [searchParams, router])


    return (
        <div>Client</div>
    )
}

export default Client