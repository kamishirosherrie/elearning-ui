import { UserSecurityIcon } from '../../components/Icon/Icon'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'

import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'

const cx = classNames.bind(styles)

function Sidebar() {
    const { logout } = useContext(AuthContext)
    const handleLogout = () => {
        logout()
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <div className={cx('navbar-item')}>
                    <UserSecurityIcon className={cx('icon')} width={24} height={24} />
                    <Link to="/my-account" className={cx('navbar-link')}>
                        Tài khoản của tôi
                    </Link>
                </div>
                <div className={cx('navbar-item')}>
                    <UserSecurityIcon className={cx('icon')} width={24} height={24} />
                    <Link to="/my-account" className={cx('navbar-link')}>
                        Khoá học của tôi
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
