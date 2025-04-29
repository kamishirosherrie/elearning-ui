import React from 'react'
import classNames from 'classnames/bind'
import styles from './TermAndCondition.module.scss'
import MainLayout from '../../layouts/MainLayout/MainLayout'

const cx = classNames.bind(styles)

function TermAndCondition() {
    return (
        <MainLayout title="Terms and Conditions">
            <div className={cx('wrapper')}>
                <h1 className={cx('title')}>Terms and Conditions</h1>
                <div className={cx('content')}>
                    <p>
                        By using EMaster, you agree to the following terms and conditions. Please read them carefully
                        before using our services.
                    </p>
                    <p>
                        <strong>Usage:</strong> Our platform is intended for educational purposes only. Any misuse of
                        the platform is prohibited.
                    </p>
                    <p>
                        <strong>Account Responsibility:</strong> You are responsible for maintaining the confidentiality
                        of your account and password.
                    </p>
                    <p>
                        <strong>Changes:</strong> We reserve the right to modify these terms at any time. Continued use
                        of the platform constitutes acceptance of the updated terms.
                    </p>
                </div>
            </div>
        </MainLayout>
    )
}

export default TermAndCondition
