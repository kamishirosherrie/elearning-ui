import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import AuthContext from '../../context/AuthContext'
import { Logo, UserIcon } from '../../components/Icons/Icon'
import { routes } from '../../routes/route'
import { getCourse } from '../../api/courseApi'
import Login from '../../components/Login/Login'
import Button from '../../components/Button/Button'

const cx = classNames.bind(styles)

function Header() {
    const { user } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const [courses, setCourses] = useState([])

    const handleLogin = () => {
        setIsOpen(true)
        console.log('clicked')
    }

    const closeModal = () => {
        setIsOpen(false)
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
                <Logo className={cx('logo')} />
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
                    <Button primary onClick={handleLogin}>
                        Đăng nhập
                    </Button>
                )}
            </div>
            <Login isOpen={isOpen} closeModal={closeModal} setIsOpen={setIsOpen} />
        </div>
    )
}

export default Header
