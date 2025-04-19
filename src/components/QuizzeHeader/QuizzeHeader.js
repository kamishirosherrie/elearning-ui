import React from 'react'
import classNames from 'classnames/bind'
import styles from './QuizzeHeader.module.scss'
import Button from '../Button/Button'
import CountdownTimer from '../CountdownTimer/CountdownTimer'

const cx = classNames.bind(styles)

const QuizzeHeader = ({ title, description, time, timerKey, isPaused, handleSubmit }) => {
    const handleOnExpire = () => {
        alert('Time is up!')
        handleSubmit()
    }
    const handleClick = () => {
        if (window.confirm('Are you sure you want to submit?')) {
            handleSubmit()
        }
    }
    return (
        <div className={cx('header')}>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className={cx('action')}>
                <Button blue border5 onClick={() => window.history.back()}>
                    Back
                </Button>
                {Number(time) > 0 && (
                    <div className={cx('count')}>
                        Time left:
                        <CountdownTimer
                            key={timerKey}
                            initialTime={Number(time) * 60}
                            onExpire={handleOnExpire}
                            isPaused={isPaused}
                        />
                    </div>
                )}
                <Button blue border5 type="submit" onClick={handleClick}>
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default QuizzeHeader
