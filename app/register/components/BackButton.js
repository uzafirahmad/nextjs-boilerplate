'use client'
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

const BackButton = () => {
    const router = useRouter()

    return (
        <div onClick={() => {
            router.push('/')
        }} id='register_back_button'>
            <IoMdArrowRoundBack id='register_back_butto_icon' />
        </div>
    )
}

export default BackButton
