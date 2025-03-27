'use client'
import H3 from "@/components/typography/h3"
import Muted from "@/components/typography/muted"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import '@/app/auth.css'
import apiCall from "@/utils/apiCall"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"


const Client = () => {
    const [loading, setLoading] = useState(false)

    const submitForm = async (e) => {
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
                    <form onSubmit={submitForm} className="auth_info_form">
                        <Input style={{ marginTop: "20px" }} name='email' type="email" placeholder="name@example.com" />
                        <Button type='submit' disabled={loading} style={{ marginTop: "8px" }}>
                            {loading ?
                                <>
                                    <Loader2 className="animate-spin" />
                                    Sending Email
                                </>
                                :
                                <>
                                    Reset Password
                                </>
                            }
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Client