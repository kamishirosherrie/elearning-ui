import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import AuthContext from '../../context/AuthContext'
import { routes } from '../../routes/route'
import { getCourse } from '../../api/courseApi'
import Login from '../../components/Login/Login'
import Button from '../../components/Button/Button'
import ModalPopup from '../../components/ModalPopup/ModalPopup'
import Register from '../../components/Register/Register'
import { image } from '../../assets/images/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faClose, faUser } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function Header() {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    const [isOpen, setIsOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(true)
    const [courses, setCourses] = useState([])

    const [active, setActive] = useState(false)

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

    const handleClickMenu = () => {
        setActive((prev) => !prev)
    }

    const handleClickUser = () => {
        if (user) {
            navigate(routes.myAccount)
        } else {
            setIsOpen(true)
        }
    }

    const handleClickPractice = () => {
        if (user) {
            navigate(routes.testPractice)
        } else {
            setIsOpen(true)
        }
    }

    useEffect(() => {
        const getCourses = async () => {
            const response = await getCourse()
            setCourses(response.courses)
        }

        getCourses()
    }, [])

    useEffect(() => {
        if (active) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [active])

    return (
        <div className={cx('wrapper')}>
            <Link className={cx('logo-wrapper')} to={routes.home}>
                <img src={image.logo} alt="logo" />
            </Link>
            <div className={cx('mobile-menu')}>
                <div className={cx('icon-wrapper')}>
                    <FontAwesomeIcon icon={faUser} className={cx('icon')} onClick={handleClickUser} />
                    <FontAwesomeIcon icon={faBars} className={cx('icon')} onClick={handleClickMenu} />
                </div>
                <ul className={cx('mobile-menu-list', { active })}>
                    <li className={cx('mobile-menu-header')}>
                        <Link className={cx('logo-wrapper')} to={routes.home}>
                            <img src={image.logo} alt="logo" />
                        </Link>
                        <FontAwesomeIcon icon={faClose} className={cx('icon')} onClick={handleClickMenu} />
                    </li>
                    <li className={cx('menu-item')}>
                        <Link to={routes.course}>
                            <span>Khóa học</span>
                        </Link>
                        <div className={cx('dropdown')}>
                            {courses?.map((course) => (
                                <a className={cx('course')} href={`${routes.course}/${course.slug}`} key={course._id}>
                                    <p>{course.title}</p>
                                </a>
                            ))}
                        </div>
                    </li>
                    <li className={cx('menu-item')}>
                        <Link to={routes.entryTest}>
                            <span>Kiểm tra đầu vào</span>
                        </Link>
                    </li>
                    <li className={cx('menu-item')} onClick={handleClickPractice}>
                        <span>Luyện đề</span>
                    </li>
                    <li className={cx('menu-item')}>
                        <Link to={routes.ranking}>
                            <span>Xếp hạng</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <ul className={cx('menu-list')}>
                <li className={cx('menu-item')}>
                    <Link to={routes.home}>
                        <span>Trang chủ</span>
                    </Link>
                </li>
                <li className={cx('menu-item')}>
                    <Link to={routes.course}>
                        <span>Khóa học</span>
                    </Link>
                    <div className={cx('dropdown')}>
                        {courses?.map((course) => (
                            <a className={cx('course')} href={`${routes.course}/${course.slug}`} key={course._id}>
                                <p>{course.title}</p>
                            </a>
                        ))}
                    </div>
                </li>
                <li className={cx('menu-item')}>
                    <Link to={routes.entryTest}>Kiểm tra đầu vào</Link>
                </li>
                <li className={cx('menu-item')} onClick={handleClickPractice}>
                    <span>Luyện đề</span>
                </li>
                <li className={cx('menu-item')}>
                    <Link to={routes.ranking}>Xếp hạng</Link>
                </li>
            </ul>
            <div className={cx('button')}>
                {user ? (
                    <div className={cx('user')}>
                        <Link to={routes.myAccount} className={cx('user-icon')}>
                            <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                            <span>{user.fullName}</span>
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
