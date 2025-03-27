import MutedSmall from "@/components/typography/mutedSmall"

const AuthDivider = () => {
    return (
        <div className='auth_info_continue_master'>
            <div className="w-[100%] bg-border h-[1px]"></div>
            <MutedSmall className="uppercase text-nowrap">
                Or continue with
            </MutedSmall>
            <div className="w-[100%] bg-border h-[1px]"></div>
        </div>
    )
}

export default AuthDivider