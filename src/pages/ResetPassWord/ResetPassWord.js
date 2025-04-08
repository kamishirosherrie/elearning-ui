import classNames from 'classnames/bind'
import styles from './ResetPassWord.module.scss'
import { image } from '../../assets/images/image'
import Button from '../../components/Button/Button'
import { useState } from 'react'
import { resetPassWord } from '../../api/authApi'
import { Link, useNavigate } from 'react-router-dom'
import { routes } from '../../routes/route'

const cx = classNames.bind(styles)

function ResetPassWord() {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInfo((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        try {
            const response = await resetPassWord(userInfo)
            console.log(response)
            if (response) {
                alert('Đổi mật khẩu thành công')
                navigate(routes.home)
            }
        } catch (error) {
            console.log('Reset password failed: ', error)
        }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('logo-wrapper')}>
                    <Link to={routes.home}>
                        <img src={image.logo} alt="logo" className={cx('logo')} />
                    </Link>
                </div>
                <h2 className={cx('title')}>Đặt lại mật khẩu</h2>
                <div className={cx('content')}>
                    <div className={cx('item')}>
                        <label htmlFor="newPassWord">Mật khẩu mới</label>
                        <input type="password" name="newPassWord" required onChange={handleChange} />
                    </div>
                    <div className={cx('item')}>
                        <label htmlFor="confirmPassWord">Xác nhận mật khẩu</label>
                        <input type="password" name="confirmPassWord" required onChange={handleChange} />
                    </div>
                    <Button blue className={cx('btn')} onClick={handleSubmit}>
                        Cập nhật
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ResetPassWord
