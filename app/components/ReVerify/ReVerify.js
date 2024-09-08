import React, { useState } from 'react'
import './ReVerify.css'
import Link from 'next/link'
import Toast from '../Toast/Toast'

const ReVerify = (props) => {
    let { email, setShowVerification, showVerification } = props
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState({})


    const resendEmail = async () => {
        if (!loading) {
            setLoading(true)
            setToast({})


            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-user-email/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email
                    })
                });

                if (response.ok) {
                    setLoading(false)
                    setToast({ type: 'success', message: 'Sign up successful! Please check your email and verify your account to Log In.' })
                } else {
                    setLoading(false)
                    setToast({ type: 'error', message: 'Sign up failed! Try a different email. If issue persists, contact support for further assistance.' })
                }
            } catch (error) {
                setLoading(false)
                setToast({ type: 'error', message: 'Error occured while signing up. Contact support for further assistance.' })
            }
        }
    };


    return (
        <>
            <Toast toast={toast} setToast={setToast} />
            <div id='reverify_container'>
                <h2 id='reverify_h2'>Verify Account</h2>
                <div className='reverify_child_body_text'>
                    A verification link has been sent to <span style={{ fontWeight: '500' }}>{email}</span>. Verify your account and get started.
                </div>
                <div id='reverify_child_body_buttons'>
                    {/* href='https://mail.google.com/mail/u/werwer@gmail.com/#search/from:notifications@stripe.com' */}
                    <Link href={`https://mail.google.com/mail/u/${email}/`} target='_blank' className='reverify_child_body_buttonzz'>Open Gmail</Link>
                    <button onClick={resendEmail} className='reverify_child_body_buttonzz'>{loading ? <><span style={{ opacity: '0.8' }}>Sending</span><span id="reverify_loader"></span></> : <span>Resend email</span>}</button>
                </div>
                {showVerification ?
                    <div style={{ textAlign: 'left' }} onClick={() => { setShowVerification(false) }}>
                        Verification done?
                        <Link id='reverify_href' href='/login'>Log In</Link>
                    </div>
                    :
                    <div style={{ textAlign: 'left' }}>
                        Verification done?
                        <Link id='reverify_href' href='/login'>Log In</Link>
                    </div>
                }
            </div>
        </>

    )
}

export default ReVerify
