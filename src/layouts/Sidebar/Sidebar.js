import { LockIcon, UserSecurityIcon } from '../../components/Icons/Icon'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'

import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import { logoutUser } from '../../api/authApi'

const cx = classNames.bind(styles)

function Sidebar() {
    const { user, logout } = useContext(AuthContext)
    const handleLogout = async () => {
        try {
            await logoutUser()
            logout()
        } catch (error) {
            console.log('Logout failed: ', error)
        }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <div className={cx('navbar-item')}>
                    <Link to="#" className={cx('navbar-link')}>
                        Xin chào {user?.fullName}!
                    </Link>
                </div>
                <div className={cx('navbar-item')}>
                    <UserSecurityIcon className={cx('icon')} width={24} height={24} />
                    <Link to="/student/my-account" className={cx('navbar-link')}>
                        Tài khoản của tôi
                    </Link>
                </div>
                <div className={cx('navbar-item')}>
                    <UserSecurityIcon className={cx('icon')} width={24} height={24} />
                    <Link to="/student/my-course" className={cx('navbar-link')}>
                        Khoá học của tôi
                    </Link>
                </div>
                <div className={cx('navbar-item')}>
                    <LockIcon className={cx('icon')} width={24} height={24} />
                    <Link to="/student/change-password" className={cx('navbar-link')}>
                        Mật khẩu
                    </Link>
                </div>
                <div className={cx('navbar-item')}>
                    <UserSecurityIcon className={cx('icon')} width={24} height={24} />
                    <Link to="/" className={cx('navbar-link')} onClick={handleLogout}>
                        Đăng xuất
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
