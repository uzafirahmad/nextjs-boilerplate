import Muted from "@/components/typography/muted"
import Link from "next/link"

const PolicyText = () => {
    return (
        <Muted style={{ marginTop: "24px" }}>
            By continuing, you agree to our <Link href='/terms-of-service' style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}>Terms of Service</Link> and <Link style={{ textDecoration: "underline", textUnderlineOffset: "4px" }} href='/privacy-policy'>Privacy Policy</Link>.
        </Muted>
    )
}

export default PolicyText