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
                    <div className={cx('user')}>
                        <Link to="/student/my-account" className={cx('user-icon')}>
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

export default HeaderOnly
