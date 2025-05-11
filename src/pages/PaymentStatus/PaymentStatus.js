import React from 'react'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './PaymentStatus.module.scss'

const cx = classNames.bind(styles)

const PaymentStatus = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const status = queryParams.get('status')

    return (
        <div className={cx('payment-status')}>
            {status === 'success' ? (
                <div className={cx('success')}>
                    <h1>Thanh toán thành công 🎉</h1>
                    <p>Giao dịch thành công. Cảm ơn bạn đã thanh toán!</p>
                </div>
            ) : (
                <div className={cx('failed')}>
                    <h1>Thanh toán thất bại ❌</h1>
                    <p>Giao dịch của bạn không thể được xử lý. Vui lòng thử lại sau.</p>
                </div>
            )}
        </div>
    )
}

export default PaymentStatus
