'use client'
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import './Toast.css'

const Toast = (props) => {
    let { toast, setToast } = props

    return (
        <>
            {Object.keys(toast).length > 0 && <div style={toast.type === 'error' ? { backgroundColor: 'var(--error)' } : { backgroundColor: 'var(--success)' }} id="toast_master">
                <div id='toast_header'>
                    <div style={toast.type === 'success' ? { backgroundColor: "var(--success-text)" } : { backgroundColor: "var(--error-text)" }} id='toast_icon_container'>
                        {toast.type === 'error' && <ImCross style={toast.type === 'error' ? { color: 'var(--error)' } : { color: 'var(--success)' }} className='toast_iconn' />}
                        {toast.type === 'success' && <FaCheck style={toast.type === 'error' ? { color: 'var(--error)' } : { color: 'var(--success)' }} className='toast_iconn' />}
                    </div>
                    <div style={toast.type === 'success' ? { color: "var(--success-text)" } : { color: "var(--error-text)" }} id="toast_head_desc">{toast.type}</div>
                    <RxCross2 style={toast.type === 'success' ? { color: "var(--success-text)" } : { color: "var(--error-text)" }} onClick={() => {
                        setToast({})
                    }} id='toast_cross' />
                </div>
                <div style={toast.type === 'success' ? { color: "var(--success-text)" } : { color: "var(--error-text)" }} id='toast_body'>
                    {toast.message}
                </div>
            </div>}
        </>
    )
}

export default Toast
