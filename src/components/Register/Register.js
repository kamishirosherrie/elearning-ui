import classNames from 'classnames/bind'
import styles from './Register.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import { useContext } from 'react'
import { registerUser } from '../../api/authApi'
import { routes } from '../../routes/route'
import AuthContext from '../../context/AuthContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from '../../validations/registerSchema'
import { toast } from 'react-toastify'
import { useLoading } from '../../context/LoadingContext'

const cx = classNames.bind(styles)

function Register({ handleClickLogin, redirect = true }) {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const { setIsLoading } = useLoading()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(registerSchema) })

    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            const response = await registerUser(data)
            console.log(response)
            login({ ...response.data })
            localStorage.setItem('accessToken', response.accessToken)
            toast.success('Đăng ký thành công')
            if (redirect) navigate(routes.myAccount)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Đăng ký thất bại')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('register-form')}>
                <h2>Đăng Ký</h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className={cx('register-content')}>
                        <label htmlFor="fullName">Họ tên</label>
                        <input {...register('fullName')} placeholder="Họ và tên" />
                        <p className={cx('error')}>{errors.fullName?.message}</p>

                        <label htmlFor="gender">Giới tính</label>
                        <select {...register('gender')}>
                            <option value="">-- None --</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Nam">Nam</option>
                        </select>
                        <p className={cx('error')}>{errors.gender?.message}</p>

                        <label htmlFor="userName">Tên người dùng</label>
                        <input {...register('userName')} placeholder="VD: abc123" />
                        <p className={cx('error')}>{errors.userName?.message}</p>

                        <label htmlFor="email">Email</label>
                        <input {...register('email')} placeholder="VD: abc123@gmail.com" />
                        <p className={cx('error')}>{errors.email?.message}</p>

                        <label htmlFor="passWord">Mật khẩu</label>
                        <input {...register('passWord')} type="password" placeholder="Mật khẩu" />
                        <p className={cx('error')}>{errors.passWord?.message}</p>

                        <label htmlFor="confirmPassWord">Xác nhận mật khẩu</label>
                        <input {...register('confirmPassWord')} type="password" placeholder="Xác nhận mật khẩu" />
                        <p className={cx('error')}>{errors.confirmPassWord?.message}</p>

                        <label htmlFor="birthday">Ngày sinh</label>
                        <input {...register('birthday')} type="date" />
                        <p className={cx('error')}>{errors.birthday?.message}</p>
                    </div>
                    <div className={cx('btn-wrapper')}>
                        <Button fullWidth shadow blue type="submit">
                            Đăng ký
                        </Button>
                    </div>
                </form>
                <div className={cx('register-bottom')}>
                    <div className={cx('login')}>
                        <span>Bạn đã có tài khoản? </span>
                        <span className={cx('login-now')} onClick={handleClickLogin}>
                            Đăng nhập ngay!
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

export default Register
