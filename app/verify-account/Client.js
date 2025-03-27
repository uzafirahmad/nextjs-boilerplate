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


const Client = () => {
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const submitForm = async (e) => {
        e.preventDefault()
        setLoading(true)

        apiCall({
            endpoint: `/auth/login`,
            method: 'POST',
            retry: false,
            body: {
                email: e.target.email.value,
                password: e.target.password.value
            },
            setLoading: setLoading,
            onSuccess: (data) => {
                console.log(data)
                // setCookie('refreshToken', data.refreshToken)
                // setCookie('accessToken', data.accessToken)
                // router.push('/')
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
            <div className='auth_dark_bg'></div>
            <div className='auth_info_container'>
                <div className='auth_info_containe_child'>
                    <H3>
                        Verify your account to log in
                    </H3>
                    <Muted style={{ marginTop: "8px" }}>
                        Clink the link sent to your email to verify your account. Check your spam folder in case you can't find the email.
                    </Muted>
                    <div onSubmit={submitForm} className="auth_verify_div">
                        <Button style={{ width: "50%" }} disabled={loading} asChild>
                            <a href={`https://mail.google.com/`} target="_blank">Open Gmail</a>
                        </Button>
                        <Button onClick={() => { setLoading(true) }} variant='outline' style={{ width: "50%" }} disabled={loading}>
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
                    <AuthDivider />
                    <GoogleAuth />
                    <PolicyText />
                </div>
            </div>
        </>
    )
}

export default Client