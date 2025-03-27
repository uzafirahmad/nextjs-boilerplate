'use client'
import { useState } from "react"
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const GoogleAuth = () => {
    const [googleLoading, setGoogleLoading] = useState(false)

    const handleGoogleLogin = () => {
        setGoogleLoading(true)
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`
    }

    return (
        <Button variant='outline' onClick={handleGoogleLogin} disabled={googleLoading}>
            {googleLoading ? (
                <>
                    <Loader2 className="animate-spin" />
                    Connecting
                </>
            ) : (
                <>
                    <FcGoogle style={{ fontSize: "18px", minWidth: "18px", minHeight: "18px" }} />
                    Google
                </>
            )}
        </Button>
    )
}

export default GoogleAuth