import classNames from 'classnames/bind'
import styles from './Register.module.scss'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import { useState } from 'react'

const cx = classNames.bind(styles)

function Register({ handleClickLogin, required }) {
    const [user, setUser] = useState({})

    const handleChangeGender = (e) => {}

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Register success')
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('register-form')}>
                <h2>Đăng Ký</h2>
                <div className={cx('register-content')}>
                    <label htmlFor="fullName">Họ tên</label>
                    <input type="fullName" id="fullName" name="fullName" placeholder="VD: Nguyễn Văn A" required />

                    <label htmlFor="gender">Giới tính</label>
                    <select name="gender" onChange={handleChangeGender} required>
                        <option value="">-- None --</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Nam">Nam</option>
                    </select>

                    <label htmlFor="userName">Tên người dùng</label>
                    <input type="text" id="userName" name="userName" placeholder="VD: abc123" required />

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="VD: abc@xyz.com" required />

                    <label htmlFor="passWord">Mật khẩu</label>
                    <input type="password" id="passWord" name="passWord" placeholder="Mật khẩu" required />

                    <label htmlFor="confirmPassWord">Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        id="confirmPassWord"
                        name="confirmPassWord"
                        placeholder="Xác nhận mật khẩu"
                        required
                    />

                    <label htmlFor="birthday">Ngày sinh</label>
                    <input type="date" id="birthday" name="birthday" required />
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
