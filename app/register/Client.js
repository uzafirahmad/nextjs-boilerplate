'use client'
import H3 from "@/components/typography/h3"
import Muted from "@/components/typography/muted"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import MutedSmall from "@/components/typography/mutedSmall"
import '@/app/auth.css'
import { useRouter } from 'nextjs-toploader/app';
import { useState } from "react"
import { Divide, Loader2 } from "lucide-react"
import { InputPassword } from "@/components/ui/inputPassword"
import apiCall from "@/utils/apiCall"
import { toast } from "sonner"
import GoogleAuth from "@/components/auth/GoogleAuth"
import PolicyText from "@/components/auth/PolicyText"
import AuthDivider from "@/components/auth/AuthDivider"
import VerifyAccount from "@/components/auth/VerifyAccount"

const Client = () => {
    const [emailLoading, setEmailLoading] = useState(false)
    const [usernameLoading, setUsernameLoading] = useState(false)
    const [passwordLoading, setPasswordLoading] = useState(false)
    const [registerStatus, setRegisterStatus] = useState('email')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [verification, setVerification] = useState(false)
    const router = useRouter()

    const submitEmailForm = async (e) => {
        e.preventDefault()
        setEmailLoading(true)

        apiCall({
            endpoint: `/auth/check-email`,
            method: 'POST',
            retry: false,
            body: {
                email: e.target.email.value,
            },
            setLoading: setEmailLoading,
            onSuccess: (data) => {
                setEmail(e.target.email.value)
                setRegisterStatus('username')
            },
            onError: (errorMessage) => {
                toast("Email Error", {
                    description: errorMessage,
                    action: {
                        label: "Done",
                    },
                })
            }
        });
    }

    const submitUsernameForm = async (e) => {
        e.preventDefault()
        setUsernameLoading(true)

        apiCall({
            endpoint: `/auth/check-username`,
            method: 'POST',
            retry: false,
            body: {
                username: e.target.username.value,
            },
            setLoading: setUsernameLoading,
            onSuccess: (data) => {
                setUsername(e.target.username.value)
                setRegisterStatus('password')
            },
            onError: (errorMessage) => {
                toast("Username Error", {
                    description: errorMessage,
                    action: {
                        label: "Done",
                    },
                })
            }
        });
    }

    const submitPasswordForm = async (e) => {
        e.preventDefault()
        setPasswordLoading(true)

        if (e.target.confirm_password.value !== e.target.password.value) {
            toast("Password Mismatch", {
                description: "The passwords you entered do not match. Please try again",
                action: {
                    label: "Done",
                },
            })
            setPasswordLoading(false)
            return
        }

        apiCall({
            endpoint: `/auth/check-password`,
            method: 'POST',
            retry: false,
            body: {
                password: e.target.password.value,
            },
            onSuccess: (data) => {
                submitRgisterationForm(email, username, e.target.password.value)
            },
            onError: (errorMessage) => {
                toast("Password Error", {
                    description: errorMessage,
                    action: {
                        label: "Done",
                    },
                })
            }
        });
    }

    const submitRgisterationForm = async (email, username, password) => {
        apiCall({
            endpoint: `/auth/register`,
            method: 'POST',
            retry: false,
            body: {
                email: email,
                username: username,
                password: password,
            },
            setLoading: setPasswordLoading,
            onSuccess: (data) => {
                apiCall({
                    endpoint: `/auth/verify-account-email`,
                    method: 'POST',
                    retry: false,
                    body: {
                        email: email
                    },
                });
                setVerification(true)
            },
            onError: (errorMessage) => {
                setRegisterStatus('email')
                toast("Registeration Error", {
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
                    {verification ?
                        <VerifyAccount email={email} />
                        :
                        <>
                            <H3>
                                Create an account
                            </H3>
                            {registerStatus === 'email' &&
                                <form onSubmit={submitEmailForm} className="auth_info_form">
                                    <Muted style={{ marginTop: "8px" }}>
                                        Enter your email below to create your account
                                    </Muted>
                                    <Input style={{ marginTop: "20px" }} name='email' type="email" placeholder="name@example.com" />
                                    <Button disabled={emailLoading} style={{ marginTop: "8px" }}>
                                        {emailLoading ?
                                            <>
                                                <Loader2 className="animate-spin" />
                                                Please wait
                                            </>
                                            :
                                            <>
                                                Sign up with Email
                                            </>
                                        }
                                    </Button>
                                </form>
                            }
                            {registerStatus === 'username' &&
                                <form onSubmit={submitUsernameForm} className="auth_info_form">
                                    <Muted style={{ marginTop: "8px" }}>
                                        What will you be known by? Enter your username
                                    </Muted>
                                    <Input style={{ marginTop: "20px" }} name='username' type="username" placeholder="John Doe" />
                                    <Button disabled={usernameLoading} style={{ marginTop: "8px" }}>
                                        {usernameLoading ?
                                            <>
                                                <Loader2 className="animate-spin" />
                                                Confirming
                                            </>
                                            :
                                            <>
                                                Confirm Username
                                            </>
                                        }
                                    </Button>
                                </form>
                            }
                            {registerStatus === 'password' &&
                                <form onSubmit={submitPasswordForm} className="auth_info_form">
                                    <Muted style={{ marginTop: "8px" }}>
                                        Enter your password below to create your account
                                    </Muted>
                                    <InputPassword style={{ marginTop: "20px" }} name='password' placeholder="Password" />
                                    <InputPassword style={{ marginTop: "8px" }} name='confirm_password' placeholder="Confirm Password" />
                                    <Button disabled={passwordLoading} style={{ marginTop: "8px" }}>
                                        {passwordLoading ?
                                            <>
                                                <Loader2 className="animate-spin" />
                                                Saving
                                            </>
                                            :
                                            <>
                                                Save Password
                                            </>
                                        }
                                    </Button>
                                </form>
                            }
                        </>
                    }
                    <AuthDivider />
                    <GoogleAuth />
                    <PolicyText />
                </div>
            </div>
        </>
    )
}

export default Client