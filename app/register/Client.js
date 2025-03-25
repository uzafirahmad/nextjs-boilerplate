'use client'
import H3 from "@/components/typography/h3"
import Muted from "@/components/typography/muted"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import MutedSmall from "@/components/typography/mutedSmall"
import '@/app/auth.css'
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'nextjs-toploader/app';
import { useState } from "react"
import { Loader2 } from "lucide-react"

const Client = () => {
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const router = useRouter()

    const handleGoogleLogin = () => {
        setGoogleLoading(true)
        // Redirect to the backend Google auth route
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`
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
                        Create an account
                    </H3>
                    <Muted style={{ marginTop: "8px" }}>
                        Enter your email below to create your account
                    </Muted>
                    <Input style={{ marginTop: "20px" }} type="email" placeholder="name@example.com" />
                    <Button style={{ marginTop: "8px" }}>Sign up with Email</Button>
                    <div className='auth_info_continue_master'>
                        <div className="w-[100%] bg-border h-[1px]"></div>
                        <MutedSmall className="uppercase text-nowrap">
                            Or continue with
                        </MutedSmall>
                        <div className="w-[100%] bg-border h-[1px]"></div>
                    </div>
                    <Button variant='outline' onClick={handleGoogleLogin} disabled={googleLoading}>
                        {googleLoading ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Connecting
                            </>
                        ) : (
                            <>
                                <FcGoogle style={{ fontSize: "18px", minWidth: "18px", minHeight: "18px" }} />
                                Google
                            </>
                        )}
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