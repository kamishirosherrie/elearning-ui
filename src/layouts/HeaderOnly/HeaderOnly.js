import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './HeaderOnly.module.scss'
import AuthContext from '../../context/AuthContext'
import Login from '../../components/Login/Login'
import Button from '../../components/Button/Button'
import ModalPopup from '../../components/ModalPopup/ModalPopup'
import Register from '../../components/Register/Register'
import { image } from '../../assets/images/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { routes } from '../../routes/route'
import Popper from '../../components/Popper/Popper'
import CourseProgress from '../../components/CourseProgress/CourseProgress'

const cx = classNames.bind(styles)

function HeaderOnly() {
    const { user } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(true)

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

    return (
        <div className={cx('wrapper')}>
            <a className={cx('logo-wrapper')} href="/">
                <img src={image.logo} alt="logo" />
            </a>

            <div className={cx('button')}>
                {user ? (
                    <Popper content={<CourseProgress />}>
                        <div className={cx('user')}>
                            <Link to={routes.myAccount} className={cx('user-icon')}>
                                <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                                <span>{user.fullName}</span>
                            </Link>
                        </div>
                    </Popper>
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
