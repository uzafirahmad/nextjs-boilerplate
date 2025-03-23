'use client'
import H3 from "@/components/typography/h3"
import Muted from "@/components/typography/muted"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import MutedSmall from "@/components/typography/mutedSmall"
import '@/app/auth.css'
import { FcGoogle } from "react-icons/fc";
import apiCall from "@/utils/apiCall"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"


const Client = () => {
    const [loading, setLoading] = useState(false)

    const submiteForm = async (e) => {
        e.preventDefault()
        setLoading(true)

        apiCall({
            endpoint: `/auth/reset-password-email`,
            method: 'POST',
            retry: false,
            body: {
                email: e.target.email.value,
            },
            setLoading: setLoading,
            onSuccess: (data) => {
                toast("Reset Email Sent", {
                    description: "A password reset link has been emailed to you. Please check your spam folder too.",
                    action: {
                        label: "Done",
                    },
                })
            },
            onError: (errorMessage) => {
                toast("Reset Email Error", {
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
                <Link href="/login">Login</Link>
            </Button>
            <div className='auth_info_container'>
                <div className='auth_info_containe_child'>
                    <H3>
                        Forgot your password?
                    </H3>
                    <Muted style={{ marginTop: "8px" }}>
                        Enter your email to receive a password reset link
                    </Muted>
                    <form onSubmit={submiteForm} className="auth_info_form">
                        <Input style={{ marginTop: "20px" }} name='email' type="email" placeholder="name@example.com" />
                        <Button type='submit' disabled={loading} style={{ marginTop: "8px" }}>
                            {loading ?
                                <>
                                    <Loader2 className="animate-spin" />
                                    Please wait
                                </>
                                :
                                <>
                                    Reset Password
                                </>
                            }
                        </Button>
                    </form>
                    {/* <div className='auth_info_continue_master'>
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
                    </Muted> */}
                </div>
            </div>
        </>
    )
}

export default Client