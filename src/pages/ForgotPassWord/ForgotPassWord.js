import classNames from 'classnames/bind'
import styles from './ForgotPassWord.module.scss'
import Button from '../../components/Button/Button'
import { image } from '../../assets/images/image'
import { useCallback, useState } from 'react'
import { forgotPassWord, verifyOtp } from '../../api/authApi'
import OTPInput from '../../components/OTPInput/OTPInput'
import { Link, useNavigate } from 'react-router-dom'
import { routes } from '../../routes/route'
import { useLoading } from '../../context/LoadingContext'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)

function ForgotPassWord() {
    const navigate = useNavigate()
    const { setIsLoading } = useLoading()

    const [email, setEmail] = useState('')
    const [clicked, setClicked] = useState(false)

    const handleChange = (e) => {
        const { value } = e.target
        setEmail(value)
    }

    const handleSendOTP = async () => {
        setIsLoading(true)
        try {
            if (email !== '') {
                const response = await forgotPassWord({ email })
                if (response) {
                    toast.success('Gửi OTP thành công')
                    setClicked(true)
                }
            } else {
                toast.error('Vui lòng nhập email')
            }
        } catch (error) {
            toast.error('Gửi OTP thất bại')
        } finally {
            setIsLoading(false)
        }
    }

    const handleOnComplete = useCallback(
        async (otpCode) => {
            setIsLoading(true)
            try {
                const response = await verifyOtp({ email, otp: otpCode })

                if (response) {
                    navigate(routes.resetPassword)
                    toast.success('Xác thực OTP thành công')
                }
            } catch (error) {
                toast.error('Xác thực OTP thất bại')
            } finally {
                setIsLoading(false)
            }
        },
        [email, navigate, setIsLoading],
    )

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('logo-wrapper')}>
                    <Link to={routes.home}>
                        <img src={image.logo} alt="logo" className={cx('logo')} />
                    </Link>
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
