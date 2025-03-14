import Modal from 'react-modal'

import styles from './HeaderOnly.module.scss'
import classNames from 'classnames/bind'
import { image } from '../../assets/images/image'
import { ArrowDown, UserIcon } from '../../components/Icons/Icon'
import { useContext, useState } from 'react'
import Login from '../../components/Login/Login'
import AuthContext from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)
Modal.setAppElement('#root')

function HeaderOnly() {
    const [isOpen, setIsOpen] = useState(false)

    const { user } = useContext(AuthContext)

    const handleLogin = () => {
        setIsOpen(true)
        console.log('clicked')
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <div className={cx('menu')}>
                    <a className={cx('logo')} href="/">
                        <img width="100px" src={image.logo} alt="logo" />
                    </a>
                    <ul className={cx('menu-list')}>
                        <li>Trang chủ</li>
                        <li>
                            Khóa học
                            <ArrowDown className={cx('icon')} />
                            <div className={cx('dropdown')}>
                                <a className={cx('course')} href="/ielts">
                                    IELTS
                                </a>
                                <a className={cx('course')} href="/toeic">
                                    TOEIC LISTENING & READING
                                </a>
                                <a className={cx('course')} href="/">
                                    TOEIC SPEAKING & WRITING
                                </a>
                                <a className={cx('course')} href="/">
                                    TOEIC 4 KỸ NĂNG
                                </a>
                            </div>
                        </li>
                        <li>
                            Kiểm tra đầu vào
                            <ArrowDown className={cx('icon')} />
                            <div className={cx('dropdown')}>
                                <a className={cx('course')} href="/">
                                    IELTS
                                </a>
                                <a className={cx('course')} href="/">
                                    TOEIC
                                </a>
                            </div>
                        </li>
                        <li>
                            Luyện đề
                            <ArrowDown className={cx('icon')} />
                            <div className={cx('dropdown')}>
                                <a className={cx('course')} href="/">
                                    Luyện đề IELTS
                                </a>
                                <a className={cx('course')} href="/">
                                    Luyện đề TOEIC
                                </a>
                            </div>
                        </li>
                        <li>
                            Blog
                            <ArrowDown className={cx('icon')} />
                            <div className={cx('dropdown')}>
                                <a className={cx('course')} href="/">
                                    IELTS
                                </a>
                                <a className={cx('course')} href="/">
                                    TOEIC LISTENING & READING
                                </a>
                                <a className={cx('course')} href="/">
                                    TOEIC SPEAKING & WRITING
                                </a>
                                <a className={cx('course')} href="/">
                                    TOEIC 4 KỸ NĂNG
                                </a>
                            </div>
                        </li>
                        <li>
                            Tin tức
                            <ArrowDown className={cx('icon')} />
                            <div className={cx('dropdown')}>
                                <a className={cx('course')} href="/">
                                    IELTS
                                </a>
                                <a className={cx('course')} href="/">
                                    TOEIC LISTENING & READING
                                </a>
                                <a className={cx('course')} href="/">
                                    TOEIC SPEAKING & WRITING
                                </a>
                                <a className={cx('course')} href="/">
                                    TOEIC 4 KỸ NĂNG
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={cx('button')}>
                    {user ? (
                        <div className={cx('user')}>
                            <Link to="/student/my-account" className={cx('user-icon')}>
                                <UserIcon width={19} height={19} />
                            </Link>
                        </div>
                    ) : (
                        <button className={cx('start-now')} onClick={handleLogin}>
                            Học ngay
                        </button>
                    )}
                </div>
            </div>
            <Login isOpen={isOpen} closeModal={closeModal} setIsOpen={setIsOpen} />
        </div>
    )
}

export default HeaderOnly
