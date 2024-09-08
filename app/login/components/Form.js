'use client'
import React, { useContext, useEffect, useState } from 'react'
import '../style.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AppContext from '../../AppContext'
import { jwtDecode } from "jwt-decode";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { setCookie } from 'cookies-next';
import { FaEye } from "react-icons/fa";
import ReVerify from '../../components/ReVerify/ReVerify'
import Toast from '../../components/Toast/Toast'

const form = () => {
    const [toast, setToast] = useState({})
    const [loading, setLoading] = useState(false)
    const [viewPassword, setViewPassword] = useState(false)
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [showVerification, setShowVerification] = useState(false)
    const { user, setAccessToken, setRefreshToken, setUser, getWebsiteNames, allWebsiteList, selectedWebsite } = useContext(AppContext)

    useEffect(() => {
        if (user && selectedWebsite && selectedWebsite && allWebsiteList) {
            allWebsiteList?.length === 0 ? router.push('/create-website') : router.push(`/dashboard/${selectedWebsite?._id}`)
        }
        // allWebsiteList?.length === 0 ? router.push('/create-website') : router.push(`/dashboard/${allWebsiteList?.[0]?._id}`);
    }, [user, selectedWebsite, allWebsiteList])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true)
            setToast({})
            const email = e.target.elements.email.value
            const password = e.target.elements.password.value
            setEmail(email)

            if (!email.includes('@') || !email.includes('.')) {
                setToast({ type: 'error', message: 'Please enter a valid email address' })
                setLoading(false)
                return
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });

                const data = await response.json()

                if (!response.ok) {
                    setLoading(false)
                    setToast({ type: 'error', message: 'Error occured while signing in. Your email or password might be incorrect. Consider resetting your password. Contact support for further assistance if issue persists.' })
                    return
                }

                if (response.ok && data.status === true) {
                    setLoading(false)
                    setShowVerification(true)
                    return
                }

                setCookie("refreshToken", data.refreshToken)
                setCookie("accessToken", data.accessToken)
                setAccessToken(data.accessToken)
                setRefreshToken(data.refreshToken)

                const decodedUser = jwtDecode(data.accessToken)

                setUser(decodedUser)

                // await getWebsiteNames()

                // setLoading(false)
            } catch (error) {
                setLoading(false)
                setToast({ type: 'error', message: 'Error occured while signing in. Your email or password might be incorrect. Consider resetting your password. Contact support for further assistance if issue persists.' })
            }
        }
    };


    return (
        <>
            <Toast toast={toast} setToast={setToast} />
            <div id='login_child'>
                {showVerification ? <ReVerify showVerification={showVerification} setShowVerification={setShowVerification} email={email} /> :
                    <>
                        <h2 id='login_h2'>Sign In</h2>
                        <form onSubmit={handleSubmit} id='login_form'>
                            <input spellCheck={false} className='login_input' required placeholder='Email' name='email'></input>
                            <div className='login_input_passwor_div'>
                                <input spellCheck={false} required className='login_input_password' type={viewPassword ? 'text' : 'password'} placeholder='Password' name='password' ></input>
                                <FaEye onClick={() => { setViewPassword(!viewPassword) }} className='login_eye' />
                            </div>
                            <Link style={{ marginBottom: '20px', textAlign: 'right' }} id='login_href' href='/forgot-password'>Forgot Password?</Link>


                            <button style={loading ? { background: 'var(--action-primary-hover)', opacity: "0.7" } : {}} id='login_button' type='submit'>
                                {loading ?
                                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        {/* <span></span> */}
                                        <span className="login_loader"></span>
                                    </span>
                                    :
                                    <>Sign In</>
                                }
                            </button>



                            {/* <button id='login_button' type='submit'>
                                {loading ? <span id="login_loader"></span> : <span>Login</span>}
                            </button> */}
                            <div style={{ textAlign: 'center' }}>Don't have an Account? <Link id='login_href' href='/register'>Register</Link></div>
                        </form>
                    </>
                }
            </div>
        </>
    )
}

export default form
