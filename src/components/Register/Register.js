import classNames from 'classnames/bind'
import styles from './Register.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import { useContext, useState } from 'react'
import { registerUser } from '../../api/authApi'
import { routes } from '../../routes/route'
import AuthContext from '../../context/AuthContext'

const cx = classNames.bind(styles)

function Register({ handleClickLogin, redirect = true }) {
    const { login } = useContext(AuthContext)

    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const handleChangeGender = (e) => {
        setUser({ ...user, gender: e.target.value })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await registerUser(user)
            console.log(response)
            login({ ...response.data })

            if (response) {
                alert('Đăng ký thành công')
                if (redirect) navigate(routes.myAccount)
            }
        } catch (error) {
            console.log('Register failed: ', error)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('register-form')}>
                <h2>Đăng Ký</h2>
                <div className={cx('register-content')}>
                    <label htmlFor="fullName">Họ tên</label>
                    <input
                        type="fullName"
                        id="fullName"
                        name="fullName"
                        placeholder="VD: Nguyễn Văn A"
                        required
                        onChange={handleChange}
                    />

                    <label htmlFor="gender">Giới tính</label>
                    <select name="gender" onChange={handleChangeGender} required>
                        <option value="">-- None --</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Nam">Nam</option>
                    </select>

                    <label htmlFor="userName">Tên người dùng</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        placeholder="VD: abc123"
                        required
                        onChange={handleChange}
                    />

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="VD: abc@xyz.com" required onChange={handleChange} />

                    <label htmlFor="passWord">Mật khẩu</label>
                    <input
                        type="password"
                        id="passWord"
                        name="passWord"
                        placeholder="Mật khẩu"
                        required
                        onChange={handleChange}
                    />

                    <label htmlFor="confirmPassWord">Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        id="confirmPassWord"
                        name="confirmPassWord"
                        placeholder="Xác nhận mật khẩu"
                        required
                        onChange={handleChange}
                    />

                    <label htmlFor="birthday">Ngày sinh</label>
                    <input type="date" id="birthday" name="birthday" required onChange={handleChange} />
                </div>
                <div className={cx('btn-wrapper')} onClick={handleSubmit}>
                    <Button fullWidth shadow blue type="submit">
                        Đăng ký
                    </Button>
                </div>
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
