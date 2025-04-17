import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './CountdownTimer.module.scss'

const cx = classNames.bind(styles)

function CountdownTimer({ initialTime, onExpire, isPaused }) {
    const [timeLeft, setTimeLeft] = useState(initialTime)

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600)
        const m = Math.floor((seconds % 3600) / 60)
        const s = seconds % 60
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }

    const formattedTime = useMemo(() => formatTime(timeLeft), [timeLeft])

    useEffect(() => {
        if (isPaused) return

        if (timeLeft <= 0) {
            if (onExpire) onExpire()
            return
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft, onExpire, isPaused])

    return <div className={cx('timer')}>{formattedTime}</div>
}

export default CountdownTimer
