'use client'
import React from 'react'
import '../style.css'
import Link from 'next/link'
import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaEye } from "react-icons/fa";
import ReVerify from '../../components/ReVerify/ReVerify'
import Toast from '../../components/Toast/Toast'

const Form = () => {
    const [toast, setToast] = useState({})
    const [email, setEmail] = useState('')
    const [verificationView, setVerificationView] = useState(false)
    const [loading, setLoading] = useState(false)
    const [viewPassword, setViewPassword] = useState(false)
    const [viewConfirmPassword, setViewConfirmPassword] = useState(false)
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{6,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true)
            setToast({})
            const first_name = e.target.elements.first_name.value
            const last_name = e.target.elements.last_name.value
            const email = e.target.elements.email.value
            const password = e.target.elements.password.value
            const confirm_password = e.target.elements.confirm_password.value

            setEmail(email)

            if (!email.includes('@') || !email.includes('.')) {
                setToast({ type: 'error', message: 'Please enter a valid email address' })
                setLoading(false)
                return
            }

            if (confirm_password !== password) {
                setToast({ type: 'error', message: 'Password and Confirm Password do not match.' })
                setLoading(false)
                return
            }

            if (!passwordRegex.test(password)) {
                setToast({ type: 'error', message: 'Password must be at least 6 characters long, include at least 1 uppercase letter, and at least 1 special character.' })
                setLoading(false)
                return
            }


            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        password: password,
                        confirm_password: confirm_password
                    })
                });

                const data = await response.json()
                if (response.ok) {
                    setLoading(false)
                    setVerificationView(true)
                    // setToast({ type: 'success', message: 'Sign up successful! Please check your email and verify your account to Log In.' })
                } else {
                    setLoading(false)
                    setToast({ type: 'error', message: data.message })
                }
            } catch (error) {
                setLoading(false)
                console.log(error)
                setToast({ type: 'error', message: error })
            }
        }
    };


    return (
        <>
            <Toast toast={toast} setToast={setToast} />
            <div id='register_child'>
                {verificationView ? <ReVerify email={email} /> :
                    <>
                        <h2 id='register_h2'>Sign Up</h2>
                        <form id='register_form' onSubmit={handleSubmit}>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                <input spellCheck={false} required style={{ width: '100%' }} className='register_input' placeholder='First Name' name='first_name' ></input>
                                <input spellCheck={false} required style={{ width: '100%' }} className='register_input' placeholder='Last Name' name='last_name' ></input>
                            </div>
                            <input spellCheck={false} required className='register_input' placeholder='Email' name='email'></input>
                            <div className='register_input_passwor_div'>
                                <input spellCheck={false} required className='register_input_password' type={viewPassword ? 'text' : 'password'} placeholder='Password' name='password' ></input>
                                <FaEye onClick={() => { setViewPassword(!viewPassword) }} className='register_eye' />
                            </div>
                            <div className='register_input_passwor_div'>
                                <input spellCheck={false} required className='register_input_password' type={viewConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' name='confirm_password' ></input>
                                <FaEye onClick={() => { setViewConfirmPassword(!viewConfirmPassword) }} className='register_eye' />
                            </div>


                            <button style={loading ? { background: 'var(--action-primary-hover)', opacity: "0.7" } : {}} id='register_button' type='submit'>
                                {loading ?
                                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <span>Signing Up</span>
                                        <span className="register_loader"></span>
                                    </span>
                                    :
                                    <>Sign Up</>
                                }
                            </button>


                            {/* <button id='register_button' type='submit'>
                                {loading ? <span id="register_loader"></span> : <span>Register</span>}
                            </button> */}
                            <div style={{ textAlign: 'center' }}>Already have an account? <Link id='register_href' href='/login'>Log In</Link></div>
                        </form>
                    </>
                }
            </div>
        </>
    );
};

export default Form;
