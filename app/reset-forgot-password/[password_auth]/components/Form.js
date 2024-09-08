'use client'
import React from 'react'
import '../style.css'
import Link from 'next/link'
import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useRouter } from 'next/navigation'
import { FaEye } from "react-icons/fa";
import Toast from '../../../components/Toast/Toast'

const Form = (props) => {
    let { password_auth } = props
    const [toast, setToast] = useState({})
    const [loading, setLoading] = useState(false)
    const [viewNewPassword, setViewNewPassword] = useState(false)
    const [viewConfirmPassword, setViewConfirmPassword] = useState(false)
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{6,}$/;
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loading) {
            setToast({})
            setLoading(true)
            const new_password = e.target.elements.new_password.value
            const confirm_password = e.target.elements.confirm_password.value

            if (confirm_password !== new_password) {
                setToast({ type: 'error', message: 'Password and Confirm Password do not match.' })
                setLoading(false)
                return
            }

            if (!passwordRegex.test(new_password)) {
                setToast({ type: 'error', message: 'Password must be at least 6 characters long, include at least 1 uppercase letter, and at least 1 special character.' })
                setLoading(false)
                return
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        password_auth: password_auth,
                        confirm_password: confirm_password,
                        new_password: new_password
                    })
                });

                if (response.ok) {
                    setLoading(false)
                    setToast({ type: 'success', message: 'Password reset successfully' })
                    const timeoutId = setTimeout(() => {
                        router.push('/login');
                    }, 2000); // Redirect after 2 seconds

                    return () => clearTimeout(timeoutId); // Cleanup on unmount
                } else {
                    setLoading(false)
                    setToast({ type: 'error', message: 'Password reset failed. Contact support for further assistance.' })
                }

            } catch (error) {
                setLoading(false)
                setToast({ type: 'error', message: 'Password reset failed. Contact support for further assistance.' })
            }
        }
    };


    return (
        <>
            <Toast toast={toast} setToast={setToast} />

            <form id='reset_forgot_password_form' onSubmit={handleSubmit}>
                <div className='reset_forgot_password_input_passwor_div'>
                    <input spellCheck={false} required className='reset_forgot_password_input_password' type={viewNewPassword ? 'text' : 'password'} placeholder='Password' name='new_password' ></input>
                    <FaEye onClick={() => { setViewNewPassword(!viewNewPassword) }} className='reset_forgot_password_eye' />
                </div>
                <div className='reset_forgot_password_input_passwor_div'>
                    <input spellCheck={false} required className='reset_forgot_password_input_password' type={viewConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' name='confirm_password' ></input>
                    <FaEye onClick={() => { setViewConfirmPassword(!viewConfirmPassword) }} className='reset_forgot_password_eye' />
                </div>



                <button style={loading ? { background: 'var(--action-primary-hover)', opacity: "0.7" } : {}} id='reset_forgot_password_button' type='submit'>
                    {loading ?
                        <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span>Resetting</span>
                            <span className="reset_forgot_password_loader"></span>
                        </span>
                        :
                        <>Reset</>
                    }
                </button>




                {/* <button id='reset_forgot_password_button' type='submit'>
                    {loading ? <span id="reset_forgot_password_loader"></span> : <span>Reset</span>}
                </button> */}
            </form>
        </>
    );
};

export default Form;
