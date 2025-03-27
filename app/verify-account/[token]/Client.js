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
            <Button className='auth_floating_btn' variant='secondary' asChild>
                <Link href="/register">Register</Link>
            </Button>
            <div className='auth_info_container'>
                <div className='auth_info_containe_child'>
                    <H3>
                        Sign into your account
                    </H3>
                    <Muted style={{ marginTop: "8px" }}>
                        Enter your email and password below to continue
                    </Muted>
                    <form onSubmit={submitForm} className="auth_info_form">
                        <Input required={true} style={{ marginTop: "20px" }} name='email' type="email" placeholder="name@example.com" />
                        <InputPassword required={true} style={{ marginTop: "8px" }} name='password' placeholder="password" />
                        <Link href='/forgot-password' className="auth_info_link">Forgot Password?</Link>
                        <Button type='submit' style={{ marginTop: "8px" }} disabled={loading}>
                            {loading ?
                                <>
                                    <Loader2 className="animate-spin" />
                                    Please wait
                                </>
                                :
                                <>
                                    Log in with Email
                                </>
                            }
                        </Button>
                    </form>
                    <AuthDivider />
                    <GoogleAuth />
                    <PolicyText />
                </div>
            </div>
        </>
    )
}

export default Client