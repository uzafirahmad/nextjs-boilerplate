'use client'
import React, { useContext, useEffect, useState } from 'react'
import '../style.css'
import { useRouter } from 'next/navigation'
import AppContext from '../../../AppContext'
import { jwtDecode } from "jwt-decode";
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

const Verification = (props) => {
    const { verification_token } = props;
    const [verified, setVerified] = useState(false);
    const [verificationFailed, setVerificationFailed] = useState(false);
    const [verificationFailedMessage, setVerificationFailedMessage] = useState('Verification Failed. Contact support for further assistance')

    const router = useRouter()
    const { user, setAccessToken, setRefreshToken, setUser } = useContext(AppContext)

    useEffect(() => {
        const postData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "ver_token": verification_token })
                });

                const data = await response.json()

                if (response.ok) {
                    setVerified(true);
                    setCookie("refreshToken", data.refreshToken)
                    setCookie("accessToken", data.accessToken)
                    setAccessToken(data.accessToken)
                    setRefreshToken(data.refreshToken)
                    setUser(jwtDecode(data.accessToken))

                    const timeoutId = setTimeout(() => {
                        router.push('/create-website');
                    }, 1000); // Redirect after 2 seconds

                    return () => clearTimeout(timeoutId); // Cleanup on unmount
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                setVerificationFailedMessage(error.message)
                setVerificationFailed(true);
            }
        };

        postData();
    }, [verification_token]);

    return (
        <div id='verify_master'>
            <div id='verify_child'>
                <h2 id='verify_h2'>Verify Account</h2>
                {(verified && !verificationFailed) &&
                    <div id='verify_child_body'>
                        <span>You have been Verified! We are now redirecting you</span>
                    </div>
                }
                {(!verified && !verificationFailed) &&
                    <div id='verify_child_body'>
                        <span>Hold on While we verify your account</span>
                        <span id="verify_loader"></span>
                    </div>
                }
                {verificationFailed &&
                    <div id='verify_child_body'>
                        <span>{verificationFailedMessage}</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default Verification
