import Client from "./Client"
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { redirect } from 'next/navigation';
import apiCall from "@/utils/apiCall";

const page = async ({ params }) => {
    const param = await params
    const token = param.token
    let refreshToken = ''
    let accessToken = ''
    let failed_verify = {
        flag: false,
        description: '',
        title: ''
    }

    await apiCall({
        endpoint: `/auth/verify-account-submit`,
        method: 'PUT',
        retry: false,
        body: {
            token: token,
        },
        onSuccess: async (data) => {
            accessToken = data.accessToken
            refreshToken = data.refreshToken
        },
        onError: (errorMessage) => {
            failed_verify = {
                flag: true,
                description: errorMessage,
                title: 'Verification Error'
            }
        }
    });

    return (
        <>
            <Client
                refreshToken={refreshToken}
                accessToken={accessToken}
                failed_verify={failed_verify}
            />
        </>
    )
}

export default page