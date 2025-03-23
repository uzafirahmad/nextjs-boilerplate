'use client'
import H3 from "@/components/typography/h3"
import Muted from "@/components/typography/muted"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import MutedSmall from "@/components/typography/mutedSmall"
import '@/app/auth.css'
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react"
import { useState } from "react"
import apiCall from "@/utils/apiCall"
import { toast } from "sonner"
import { InputPassword } from "@/components/ui/inputPassword"
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import Link from "next/link"
import { useRouter } from 'nextjs-toploader/app';


const Client = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const submiteForm = async (e) => {
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
                setCookie('refreshToken', data.refreshToken)
                setCookie('accessToken', data.accessToken)
                router.push('/')
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
                    <form onSubmit={submiteForm} className="auth_info_form">
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
                    <div className='auth_info_continue_master'>
                        <div className="w-[100%] bg-border h-[1px]"></div>
                        <MutedSmall className="uppercase text-nowrap">
                            Or continue with
                        </MutedSmall>
                        <div className="w-[100%] bg-border h-[1px]"></div>
                    </div>
                    <Button variant='outline'>
                        <FcGoogle style={{ fontSize: "20px", minWidth: "20px", minHeight: "20px" }} />
                        Google
                    </Button>
                    <Muted style={{ marginTop: "24px" }}>
                        By continuing, you agree to our <Link href='/terms-of-service' style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}>Terms of Service</Link> and <Link style={{ textDecoration: "underline", textUnderlineOffset: "4px" }} href='/privacy-policy'>Privacy Policy</Link>.
                    </Muted>
                </div>
            </div>
        </>
    )
}

export default Client