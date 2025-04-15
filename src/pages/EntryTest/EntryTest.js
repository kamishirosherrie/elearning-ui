import classNames from 'classnames/bind'
import styles from './EntryTest.module.scss'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import Button from '../../components/Button/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../routes/route'

const cx = classNames.bind(styles)

function EntryTest() {
    const navigate = useNavigate()
    const [test, setTest] = useState('')
    const handleClick = (test) => {
        setTest(test)
    }

    const handleSubmit = () => {
        if (test === 'quick-test') {
            navigate(`${routes.quizze}/${test}`)
        } else if (test === 'full-test') {
            navigate(`${routes.quizze}/${test}`)
        } else return
    }

    return (
        <MainLayout>
            <div className={cx('wrapper')}>
                <h2 className={cx('title')}>Entry test</h2>
                <div className={cx('content')}>
                    <div
                        className={cx('content-item', { selected: test === 'quick-test' })}
                        onClick={() => handleClick('quick-test')}
                    >
                        <h3 className={cx('content-title')}>Quick test</h3>
                        <p className={cx('content-description')}>Thời gian làm bài: 00:30:00</p>
                        <p className={cx('content-description')}>Quick test description</p>
                    </div>
                    <div
                        className={cx('content-item', { selected: test === 'full-test' })}
                        onClick={() => handleClick('full-test')}
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
        </MainLayout>
    )
}

export default EntryTest
