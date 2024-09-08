'use client'
import React from 'react'
import '../style.css'
import Link from 'next/link'
import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaEye } from "react-icons/fa";
import Toast from '../../components/Toast/Toast'

const Form = () => {
    const [toast, setToast] = useState({})
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true)
            setToast({})
            const email = e.target.elements.email.value

            if (!email.includes('@') || !email.includes('.')) {
                setToast({ type: 'error', message: 'Please enter a valid email address' })
                setLoading(false)
                return
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email
                    })
                });

                setLoading(false)
                setToast({ type: 'success', message: 'If the email you entered is valid, a password reset link has been sent to it.' })
            } catch (error) {
                setLoading(false)
                setToast({ type: 'error', message: 'Error occured while emailing password reset link' })
            }
        }
    };


    return (
        <>
            <Toast toast={toast} setToast={setToast} />

            <form id='forgot_password_form' onSubmit={handleSubmit}>
                <input required className='forgot_password_input' placeholder='Email' spellCheck={false} name='email'></input>
                {/* <div className="forgot_password_status" style={messageStyle}>{message}</div> */}


                <button style={loading ? { background: 'var(--action-primary-hover)', opacity: "0.7" } : {}} id='forgot_password_button' type='submit'>
                    {loading ?
                        <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span>Sending Email</span>
                            <span className="forgot_password_loader"></span>
                        </span>
                        :
                        <>Reset</>
                    }
                </button>


                {/* <button id='forgot_password_button' type='submit'>
                    {loading ? <span id="forgot_password_loader"></span> : <span>Reset</span>}
                </button> */}
                <div style={{ textAlign: 'center' }}>Remembered your Password? <Link id='forgot_password_href' href='/login'>Log In</Link></div>
            </form>
        </>
    );
};

export default Form;
