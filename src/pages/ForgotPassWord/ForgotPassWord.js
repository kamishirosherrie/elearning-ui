import classNames from 'classnames/bind'
import styles from './ForgotPassWord.module.scss'
import Button from '../../components/Button/Button'
import { image } from '../../assets/images/image'
import { useCallback, useState } from 'react'
import { forgotPassWord, verifyOtp } from '../../api/authApi'
import OTPInput from '../../components/OTPInput/OTPInput'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../routes/route'

const cx = classNames.bind(styles)

function ForgotPassWord() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [clicked, setClicked] = useState(false)

    const handleChange = (e) => {
        const { value } = e.target
        setEmail(value)
    }

    const handleSendOTP = async () => {
        try {
            if (email !== '') {
                const response = await forgotPassWord({ email })
                if (response) {
                    alert('Đã gửi OTP đến email của bạn')
                    setClicked(true)
                }
            } else {
                alert('Vui lòng nhập email')
            }
        } catch (error) {
            alert('Đã xảy ra lỗi, vui lòng thử lại sau')
        }
    }

    const handleOnComplete = useCallback(
        async (otpCode) => {
            console.log('OTP code: ', otpCode)
            try {
                const response = await verifyOtp({ email, otp: otpCode })
                console.log('Response: ', response)

                if (response) {
                    navigate(routes.resetPassword)
                }
            } catch (error) {
                console.log('Verify otp failed: ', error)
            }
        },
        [email, navigate],
    )

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('logo-wrapper')}>
                    <img src={image.logo} alt="logo" className={cx('logo')} />
                </div>
                <h2 className={cx('title')}>Quên mật khẩu</h2>
                {!clicked ? (
                    <div className={cx('content')}>
                        <p className={cx('sub-title')}>
                            Nhập địa chỉ email của bạn để nhận được một liên kết đặt lại mật khẩu.
                        </p>
                        <div className={cx('email')}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                placeholder="VD: abc@xyz.com"
                                onChange={handleChange}
                            />
                        </div>
                        <div className={cx('btn-wrapper')}>
                            <Button blue className={cx('btn')} onClick={handleSendOTP}>
                                Gửi OTP
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className={cx('content')}>
                        <p className={cx('sub-title')}>Nhập mã OTP đã được gửi đến email của bạn.</p>
                        <div className={cx('otp')}>
                            <OTPInput length={6} onComplete={handleOnComplete} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ForgotPassWord
