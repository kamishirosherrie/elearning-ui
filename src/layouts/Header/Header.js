import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import AuthContext from '../../context/AuthContext'
import { UserIcon } from '../../components/Icons/Icon'
import { routes } from '../../routes/route'
import { getCourse } from '../../api/courseApi'
import Login from '../../components/Login/Login'
import Button from '../../components/Button/Button'
import ModalPopup from '../../components/ModalPopup/ModalPopup'
import Register from '../../components/Register/Register'
import { image } from '../../assets/images/image'

const cx = classNames.bind(styles)

function Header() {
    const { user } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(true)
    const [courses, setCourses] = useState([])

    const handleLogin = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
        setIsLoginOpen(true)
    }

    const handleClickRegister = () => {
        setIsLoginOpen(false)
    }

    const handleClickLogin = () => {
        setIsLoginOpen(true)
    }

    useEffect(() => {
        const getCourses = async () => {
            const response = await getCourse()
            setCourses(response.courses)
        }

        getCourses()
    }, [])

    return (
        <div className={cx('wrapper')}>
            <a className={cx('logo-wrapper')} href="/">
                <img src={image.logo} alt="logo" />
            </a>
            <ul className={cx('menu-list')}>
                <li className={cx('menu-item')}>
                    <Link to={routes.home}>
                        <span>Trang chủ</span>
                    </Link>
                </li>
                <li className={cx('menu-item')}>
                    <span>Khóa học</span>
                    <div className={cx('dropdown')}>
                        {courses?.map((course) => (
                            <a className={cx('course')} href={`${routes.course}/${course.slug}`} key={course._id}>
                                <p>{course.title}</p>
                            </a>
                        ))}
                    </div>
                </li>
                <li className={cx('menu-item')}>
                    <span>Kiểm tra đầu vào</span>
                    <div className={cx('dropdown')}>
                        {courses?.map((course) => (
                            <a className={cx('course')} href={`${routes.course}/${course.slug}`} key={course._id}>
                                <p>{course.title}</p>
                            </a>
                        ))}
                    </div>
                </li>
                <li className={cx('menu-item')}>
                    <span>Luyện đề</span>
                    <div className={cx('dropdown')}>
                        {courses?.map((course) => (
                            <a className={cx('course')} href={`${routes.course}/${course.slug}`} key={course._id}>
                                <p>Luyện đề {course.title}</p>
                            </a>
                        ))}
                    </div>
                </li>
                <li className={cx('menu-item')}>
                    <span>Blog</span>
                    <div className={cx('dropdown')}>
                        {courses?.map((course) => (
                            <a className={cx('course')} href={`${routes.course}/${course.slug}`} key={course._id}>
                                <p>{course.title}</p>
                            </a>
                        ))}
                    </div>
                </li>
                <li className={cx('menu-item')}>
                    <span>Về chúng tôi</span>
                </li>
            </ul>
            <div className={cx('button')}>
                {user ? (
                    <div className={cx('user')}>
                        <Link to="/student/my-account" className={cx('user-icon')}>
                            <UserIcon width={19} height={19} />
                            <span>{user.user.fullName}</span>
                        </Link>
                    </div>
                ) : (
                    <Button black onClick={handleLogin}>
                        Đăng nhập
                    </Button>
                )}
            </div>
            <ModalPopup isOpen={isOpen} closeModal={closeModal}>
                {isLoginOpen ? (
                    <Login handleClickRegister={handleClickRegister} />
                ) : (
                    <Register handleClickLogin={handleClickLogin} />
                )}
            </ModalPopup>
        </div>
    )
}

export default Header
