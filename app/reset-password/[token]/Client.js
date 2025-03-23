'use client'
import H3 from "@/components/typography/h3"
import Muted from "@/components/typography/muted"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import MutedSmall from "@/components/typography/mutedSmall"
import '@/app/auth.css'
import { FcGoogle } from "react-icons/fc";
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from 'nextjs-toploader/app';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { InputPassword } from "@/components/ui/inputPassword"
import apiCall from "@/utils/apiCall"


const Client = ({ token }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const submiteForm = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (e.target.confirm_new_password.value !== e.target.new_password.value) {
            toast("Password Mismatch", {
                description: "The passwords you entered do not match. Please try again",
                action: {
                    label: "Done",
                },
            })
            setLoading(false)
            return
        }

        apiCall({
            endpoint: `/auth/reset-password-submit`,
            method: 'PUT',
            retry: false,
            body: {
                token: token,
                password: e.target.confirm_new_password.value,
            },
            setLoading: setLoading,
            onSuccess: async (data) => {
                toast("Password Reset Successful", {
                    description: "Your password has been reset successfully. Please log in again",
                    action: {
                        label: "Done",
                    },
                })

                deleteCookie('refreshToken')
                deleteCookie('accessToken')

                await new Promise(r => setTimeout(r, 1000));

                router.push('/login')
            },
            onError: (errorMessage) => {
                toast("Password Reset Error", {
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
                        Reset your password
                    </H3>
                    <Muted style={{ marginTop: "8px" }}>
                        Enter your new password below to reset it
                    </Muted>
                    <form onSubmit={submiteForm} className="auth_info_form">
                        <InputPassword required={true} style={{ marginTop: "20px" }} name='new_password' type="password" placeholder="New Password" />
                        <InputPassword required={true} style={{ marginTop: "8px" }} name='confirm_new_password' type="password" placeholder="Confirm New Password" />
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