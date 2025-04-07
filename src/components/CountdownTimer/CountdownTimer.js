import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './CountdownTimer.module.scss'

const cx = classNames.bind(styles)

function CountdownTimer({ initialTime, onExpire }) {
    const [timeLeft, setTimeLeft] = useState(initialTime)

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }

    const formattedTime = useMemo(() => formatTime(timeLeft), [timeLeft])

    useEffect(() => {
        if (timeLeft <= 0) {
            if (onExpire) onExpire()
            return
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft, onExpire])

    return <div className={cx('timer')}>{formattedTime}</div>
}

export default CountdownTimer
