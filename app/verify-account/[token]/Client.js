'use client'
import '@/app/auth.css'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

const Client = ({
    refreshToken,
    accessToken,
    failed_verify
}) => {
    const router = useRouter()

    useEffect(() => {
        if (failed_verify.flag === true) {
            toast(failed_verify.title, {
                description: failed_verify.description,
                action: {
                    label: "Done",
                },
            })
            router.push('/login')
        } else {
            setCookie("refreshToken", refreshToken)
            setCookie("accessToken", accessToken)
            router.push('/')
        }
    }, [])

    return (
        <>
        </>
    )
}

export default Client