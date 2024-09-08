import './style.css'
import Verification from './components/Verification'

const page = ({ params }) => {
    let verification_token = params.verification_token

    return (
        <Verification verification_token={verification_token} />
    )
}

export default page
