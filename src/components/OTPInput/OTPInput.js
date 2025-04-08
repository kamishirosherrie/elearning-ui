import classNames from 'classnames/bind'
import styles from './OTPInput.module.scss'
import { useEffect, useRef, useState } from 'react'

const cx = classNames.bind(styles)

function OTPInput({ length, onComplete }) {
    const [otp, setOtp] = useState(Array(length).fill(''))
    const inputRefs = useRef([])

    const handleChange = (e, index) => {
        const value = e.target.value

        if (!/^[0-9]*$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value && index < length - 1) {
            inputRefs.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus()
        }
    }

    useEffect(() => {
        const otpCode = otp.join('')
        const isComplete = otp.every((digit) => digit !== '')

        if (isComplete) {
            onComplete?.(otpCode, isComplete)
        }
    }, [otp, onComplete])

    return (
        <div className={cx('wrapper')}>
            {otp.map((digit, index) => (
                <input
                    key={index}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(elem) => (inputRefs.current[index] = elem)}
                    maxLength={1}
                />
            ))}
        </div>
    )
}

export default OTPInput
