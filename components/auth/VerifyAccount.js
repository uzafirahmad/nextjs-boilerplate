'use client'
import H3 from "@/components/typography/h3"
import Muted from "@/components/typography/muted"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import MutedSmall from "@/components/typography/mutedSmall"
import '@/app/auth.css'
import { Divide, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import apiCall from "@/utils/apiCall"
import { toast } from "sonner"
import { InputPassword } from "@/components/ui/inputPassword"
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import Link from "next/link"
import { useRouter } from 'nextjs-toploader/app';
import { useSearchParams } from "next/navigation"
import GoogleAuth from "@/components/auth/GoogleAuth"
import PolicyText from "@/components/auth/PolicyText"
import AuthDivider from "@/components/auth/AuthDivider"


const VerifyAccount = ({ email }) => {
    const [loading, setLoading] = useState(false)

    console.log(email)

    const router = useRouter()

    const submitForm = async () => {
        setLoading(true)

        apiCall({
            endpoint: `/auth/verify-account-email`,
            method: 'POST',
            retry: false,
            body: {
                email: email
            },
            setLoading: setLoading,
            onSuccess: (data) => {
                toast("Verification Email Sent", {
                    description: "A verification link has been to you. Please check your spam folder incase you don't see it",
                    action: {
                        label: "Done",
                    },
                })
            },
            onError: (errorMessage) => {
                toast("Login Error", {
                    description: errorMessage,
                    action: {
                        label: "Done",
                    },
                })
            }
        });
    }

    return (
        <>
            <H3>
                Verify your account to log in
            </H3>
            <Muted style={{ marginTop: "8px" }}>
                Clink the link sent to your email to verify your account. Check your spam folder in case you can't find the email.
            </Muted>
            <div className="auth_verify_div">
                <Button style={{ width: "50%" }} disabled={loading} asChild>
                    <a href={`https://mail.google.com/`} target="_blank">Open Gmail</a>
                </Button>
                <Button onClick={submitForm} variant='outline' style={{ width: "50%" }} disabled={loading}>
                    {loading ?
                        <>
                            <Loader2 className="animate-spin" />
                            Sending Email
                        </>
                        :
                        <>
                            Resend Email
                        </>
                    }
                </Button>
            </div>
        </>
    )
}

export default VerifyAccount