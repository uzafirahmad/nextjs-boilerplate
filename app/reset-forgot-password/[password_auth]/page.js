import React from 'react'
import './style.css'
import Link from 'next/link'
import Form from './components/Form'
import BackButton from './components/BackButton'

const page = ({ params }) => {
    let password_auth = params.password_auth

    return (
        <div id='reset_forgot_password_master'>
            <div id='reset_forgot_password_child'>
                <h2 id='reset_forgot_password_h2'>Reset Your Password</h2>
                <Form password_auth={password_auth} />
            </div>
            <BackButton />
        </div>
    )
}

export default page
