import classNames from 'classnames/bind'
import styles from './EntryTest.module.scss'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import Button from '../../components/Button/Button'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../routes/route'
import AuthContext from '../../context/AuthContext'
import ModalPopup from '../../components/ModalPopup/ModalPopup'
import Login from '../../components/Login/Login'
import Register from '../../components/Register/Register'

const cx = classNames.bind(styles)

function EntryTest() {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [test, setTest] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(true)

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

    const handleClick = (test) => {
        setTest(test)
    }

    const handleSubmit = () => {
        if (test === 'toeic-reading-quick-test') {
            navigate(`${routes.quizze}/${test}`)
        } else if (test === 'toeic-reading-full-test') {
            navigate(`${routes.quizze}/${test}`)
        } else return
    }

    return (
        <MainLayout>
            <div className={cx('wrapper')}>
                <h2 className={cx('title')}>Entry test</h2>
                <div className={cx('content')}>
                    <div
                        className={cx('content-item', { selected: test === 'toeic-reading-quick-test' })}
                        onClick={() => handleClick('toeic-reading-quick-test')}
                    >
                        <h3 className={cx('content-title')}>Quick test</h3>
                        <p className={cx('content-description')}>Thời gian làm bài: 00:30:00</p>
                        <p className={cx('content-description')}>Quick test description</p>
                    </div>
                    <div
                        className={cx('content-item', { selected: test === 'toeic-reading-full-test' })}
                        onClick={() => handleClick('toeic-reading-full-test')}
                    >
                        <h3 className={cx('content-title')}>Full test</h3>
                        <p className={cx('content-description')}>Thời gian làm bài: 02:00:00</p>
                        <p className={cx('content-description')}>Full test description</p>
                    </div>
                    <Button blue hover onClick={handleSubmit}>
                        Start
                    </Button>
                </div>
            </div>
            <ModalPopup isOpen={isOpen} closeModal={closeModal}>
                {isLoginOpen ? (
                    <Login handleClickRegister={handleClickRegister} redirect={false} />
                ) : (
                    <Register handleClickLogin={handleClickLogin} redirect={false} />
                )}
            </ModalPopup>
        </MainLayout>
    )
}

export default EntryTest
