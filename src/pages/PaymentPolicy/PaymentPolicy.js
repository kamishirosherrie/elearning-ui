import React from 'react'
import classNames from 'classnames/bind'
import styles from './PaymentPolicy.module.scss'
import MainLayout from '../../layouts/MainLayout/MainLayout'

const cx = classNames.bind(styles)

function PaymentPolicy() {
    return (
        <MainLayout title="Payment Policy">
            <div className={cx('wrapper')}>
                <h1 className={cx('title')}>Payment Policy</h1>
                <div className={cx('content')}>
                    <p>
                        At EMaster, we strive to provide a seamless payment experience. Please review our payment policy
                        below.
                    </p>
                    <p>
                        <strong>Accepted Methods:</strong> We accept payments via credit card, PayPal, and bank
                        transfers.
                    </p>
                    <p>
                        <strong>Refund Policy:</strong> Refunds are available within 7 days of purchase, provided the
                        course has not been accessed.
                    </p>
                    <p>
                        <strong>Security:</strong> All transactions are encrypted and processed securely.
                    </p>
                </div>
            </div>
        </MainLayout>
    )
}

export default PaymentPolicy
