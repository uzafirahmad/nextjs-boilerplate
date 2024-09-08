'use client'
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

const BackButton = () => {
    const router = useRouter()

    return (
        <div onClick={() => {
            router.push('/')
        }} id='forgot_password_back_button'>
            <IoMdArrowRoundBack id='forgot_password_back_butto_icon' />
        </div>
    )
}

export default BackButton
