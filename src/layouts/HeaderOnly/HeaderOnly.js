import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './HeaderOnly.module.scss'
import AuthContext from '../../context/AuthContext'
import { Logo, UserIcon } from '../../components/Icons/Icon'
import { routes } from '../../routes/route'
import { getCourse } from '../../api/courseApi'
import Login from '../../components/Login/Login'
import Button from '../../components/Button/Button'
import ModalPopup from '../../components/ModalPopup/ModalPopup'
import Register from '../../components/Register/Register'

const cx = classNames.bind(styles)

function HeaderOnly() {
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
                <Logo className={cx('logo')} />
            </a>

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

export default HeaderOnly
