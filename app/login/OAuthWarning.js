'use client'
import '@/app/auth.css'
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useSearchParams } from "next/navigation"


const OAuthWarning = () => {
    const searchParams = useSearchParams()

    useEffect(() => {
        const error = searchParams.get('error')
        if (error === 'google_auth_failed') {
            toast("Google Login Error", {
                description: "Failed to authenticate with Google. Please try again or use email login.",
                action: {
                    label: "Done",
                },
            })
        }
    }, [searchParams])

    return (
        <>
        </>
    )
}

export default OAuthWarning