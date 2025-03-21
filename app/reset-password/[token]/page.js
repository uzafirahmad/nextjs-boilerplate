import Client from "./Client"

const page = async ({ params }) => {
    const param = await params

    return (
        <>
            <Client token={param.token} />
        </>
    )
}

export default page