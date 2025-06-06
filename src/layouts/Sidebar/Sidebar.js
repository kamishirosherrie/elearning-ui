import {
    CourseIcon,
    LockIcon,
    LogoutIcon,
    StudyProgressIcon,
    TestPracticeIcon,
    UserActiveIcon,
    UserIcon,
    StudyProgressActiveIcon,
    TestPracticeActiveIcon,
    CourseActiveIcon,
    LockActiveIcon,
} from '../../components/Icons/Icon'
import { Link, useLocation } from 'react-router-dom'
import { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import { logoutUser } from '../../api/authApi'
import { routes } from '../../routes/route'

const cx = classNames.bind(styles)

function Sidebar() {
    const { user, logout } = useContext(AuthContext)
    const location = useLocation()

    const [active, setActive] = useState(false)

    const isActive = (path) => location.pathname === path

    const handleOnClick = () => {
        setActive(!active)
    }

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
                <div className={cx('navbar-item', { active: isActive(routes.myAccount) })}>
                    {isActive(routes.myAccount) ? (
                        <UserActiveIcon className={cx('icon')} width={24} height={24} />
                    ) : (
                        <UserIcon className={cx('icon')} width={24} height={24} />
                    )}
                    <Link to={routes.myAccount} className={cx('navbar-link')}>
                        Tài khoản của tôi
                    </Link>
                </div>
                <div className={cx('navbar-item', { active: isActive(routes.myCourse) })}>
                    {isActive(routes.myCourse) ? (
                        <CourseActiveIcon className={cx('icon', 'active')} width={24} height={24} />
                    ) : (
                        <CourseIcon className={cx('icon')} width={24} height={24} />
                    )}
                    <Link to={routes.myCourse} className={cx('navbar-link')}>
                        Khoá học của tôi
                    </Link>
                </div>
                <div className={cx('navbar-item', { active: isActive(routes.mySubmission) })}>
                    {isActive(routes.mySubmission) ? (
                        <StudyProgressActiveIcon className={cx('icon')} width={24} height={24} />
                    ) : (
                        <StudyProgressIcon className={cx('icon')} width={24} height={24} />
                    )}
                    <Link to={routes.mySubmission} className={cx('navbar-link')}>
                        Lịch sử làm bài
                    </Link>
                </div>
                <div className={cx('navbar-item', { active: isActive(routes.testPractice) })}>
                    {isActive(routes.testPractice) ? (
                        <TestPracticeActiveIcon className={cx('icon')} width={24} height={24} />
                    ) : (
                        <TestPracticeIcon className={cx('icon')} width={24} height={24} />
                    )}
                    <Link to={routes.testPractice} className={cx('navbar-link')}>
                        Luyện đề
                    </Link>
                </div>
                <div className={cx('navbar-item', { active: isActive(routes.changePassword) })}>
                    {isActive(routes.changePassword) ? (
                        <LockActiveIcon className={cx('icon', 'active')} width={24} height={24} />
                    ) : (
                        <LockIcon className={cx('icon')} width={24} height={24} />
                    )}
                    <Link to={routes.changePassword} className={cx('navbar-link')}>
                        Mật khẩu
                    </Link>
                </div>
                <div className={cx('navbar-item')}>
                    <LogoutIcon className={cx('icon')} width={24} height={24} />
                    <Link to={routes.home} className={cx('navbar-link')} onClick={handleLogout}>
                        Đăng xuất
                    </Link>
                </div>
            </div>
            <div className={cx('navbar-mobile')}>
                <div className={cx('navbar-item')}>
                    <Link to="#" className={cx('navbar-link')}>
                        Xin chào {user?.fullName}!
                    </Link>
                </div>
                <div className={cx('navbar-mobile-menu', { active })} id="myAccount" onClick={handleOnClick}>
                    <div className={cx('navbar-mobile-title')}>
                        <UserActiveIcon className={cx('icon')} width={24} height={24} />
                        Tài khoản của tôi
                        <FontAwesomeIcon icon={active ? faAngleUp : faAngleDown} />
                    </div>
                    <div className={cx('navbar-mobile-dropdown')}>
                        <Link to={routes.myAccount} className={cx('navbar-item')}>
                            {isActive(routes.myAccount) ? (
                                <UserActiveIcon className={cx('icon')} width={24} height={24} />
                            ) : (
                                <UserIcon className={cx('icon')} width={24} height={24} />
                            )}
                            Tài khoản của tôi
                        </Link>
                        <Link to={routes.myCourse} className={cx('navbar-item')}>
                            {isActive(routes.myCourse) ? (
                                <CourseActiveIcon className={cx('icon', 'active')} width={24} height={24} />
                            ) : (
                                <CourseIcon className={cx('icon')} width={24} height={24} />
                            )}
                            Khoá học của tôi
                        </Link>
                        <Link to={routes.mySubmission} className={cx('navbar-item')}>
                            {isActive(routes.mySubmission) ? (
                                <StudyProgressActiveIcon className={cx('icon')} width={24} height={24} />
                            ) : (
                                <StudyProgressIcon className={cx('icon')} width={24} height={24} />
                            )}
                            Lịch sử làm bài
                        </Link>
                        <Link to={routes.testPractice} className={cx('navbar-item')}>
                            {isActive(routes.testPractice) ? (
                                <TestPracticeActiveIcon className={cx('icon')} width={24} height={24} />
                            ) : (
                                <TestPracticeIcon className={cx('icon')} width={24} height={24} />
                            )}
                            Luyện đề
                        </Link>
                        <Link to={routes.changePassword} className={cx('navbar-item')}>
                            {isActive(routes.changePassword) ? (
                                <LockActiveIcon className={cx('icon', 'active')} width={24} height={24} />
                            ) : (
                                <LockIcon className={cx('icon')} width={24} height={24} />
                            )}
                            Mật khẩu
                        </Link>
                        <Link to={routes.home} className={cx('navbar-item')} onClick={handleLogout}>
                            <LogoutIcon className={cx('icon')} width={24} height={24} />
                            Đăng xuất
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
