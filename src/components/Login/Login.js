import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Login.module.scss'

import AuthContext from '../../context/AuthContext'
import { loginUser } from '../../api/authApi'
import Button from '../Button/Button'
import GoogleLogin from '../SocialLogin/GoogleLogin/GoogleLogin'
import FacebookLogin from '../SocialLogin/FacebookLogin/FacebookLogin'
import { routes } from '../../routes/route'
import { toast } from 'react-toastify'
import { useLoading } from '../../context/LoadingContext'

const cx = classNames.bind(styles)

const Login = ({ handleClickRegister, redirect = true }) => {
    const { login } = useContext(AuthContext)
    const { setIsLoading } = useLoading()
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [isActive, setIsActive] = useState({
        input: false,
        passWord: false,
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleFocus = (field) => {
        setIsActive((prev) => ({ ...prev, [field]: true }))
    }

    const handleBlur = (field) => {
        setIsActive((prev) => ({ ...prev, [field]: false }))
    }

    const handleSubmit = async (e) => {
        setIsLoading(true)
        try {
            e.preventDefault()
            if (user.identifier && user.passWord) {
                const response = await loginUser(user)
                login({ ...response.user })
                localStorage.setItem('accessToken', response.accessToken)
                toast.success(response.message)
                if (redirect) navigate(redirect)
            } else {
                toast.error('Vui lòng nhập đầy đủ thông tin')
            }
        } catch (error) {
            console.log('Login failed: ', error.message)
            toast.error(error.response?.data?.message || 'Đăng nhập thất bại')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('login-form')}>
                <h2>Đăng Nhập</h2>
                <form onSubmit={handleSubmit}>
                    <div className={cx('by-username')}>
                        <label htmlFor="identifier" className={isActive.input ? cx('active') : null}>
                            Username/Email
                        </label>
                        <input
                            type="text"
                            id="identifier"
                            name="identifier"
                            placeholder="VD: username123"
                            value={user.identifier || ''}
                            onChange={handleChange}
                            onFocus={() => handleFocus('input')}
                            onBlur={() => handleBlur('input')}
                        />
                        <label htmlFor="passWord" className={isActive.passWord ? cx('active') : null}>
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            id="passWord"
                            name="passWord"
                            placeholder="Nhập mật khẩu"
                            value={user.passWord || ''}
                            onChange={handleChange}
                            onFocus={() => handleFocus('passWord')}
                            onBlur={() => handleBlur('passWord')}
                        />
                    </div>
                    <div className={cx('forgot-password')}>
                        <Link to={routes.forgotPassword}>Quên mật khẩu?</Link>
                    </div>
                    <div className={cx('btn-wrapper')}>
                        <Button fullWidth shadow blue type="submit">
                            Đăng nhập
                        </Button>
                    </div>
                </form>
                <div className={cx('login-bottom')}>
                    <div className={cx('login-option')}>
                        Hoặc đăng nhập với{' '}
                        <div className={cx('social-login')}>
                            <GoogleLogin redirect={redirect} />
                            /
                            <FacebookLogin redirect={redirect} />
                        </div>
                    </div>
                    <div className={cx('register')}>
                        <span>Bạn chưa có tài khoản? </span>
                        <span className={cx('register-now')} onClick={handleClickRegister}>
                            Đăng ký ngay!
                        </span>
                    </div>
                    <br />
                    <div className={cx('term-and-condition')}>
                        <span>
                            Bằng cách tham gia, chúng tôi xác nhận bạn đã đọc và đồng ý với{' '}
                            <Link to="/">Điều kiện & Điều khoản</Link> cùng
                            <Link to="/"> Chính sách bảo mật</Link> của Edu English.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
