import { Suspense } from "react"
import Client from "./Client"

const page = () => {
    return (
        <>
            <Suspense>
                <Client />
            </Suspense>
        </>
    )
}

export default page