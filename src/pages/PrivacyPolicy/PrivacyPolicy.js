import React from 'react'
import classNames from 'classnames/bind'
import styles from './PrivacyPolicy.module.scss'
import MainLayout from '../../layouts/MainLayout/MainLayout'

const cx = classNames.bind(styles)

function PrivacyPolicy() {
    return (
        <MainLayout title="Privacy Policy">
            <div className={cx('wrapper')}>
                <h1 className={cx('title')}>Privacy Policy</h1>
                <div className={cx('content')}>
                    <p>
                        At EMaster, we value your privacy and are committed to protecting your personal information.
                        This policy outlines how we collect, use, and safeguard your data.
                    </p>
                    <p>
                        <strong>Data Collection:</strong> We collect personal information such as your name, email, and
                        phone number when you register or use our services.
                    </p>
                    <p>
                        <strong>Data Usage:</strong> Your data is used to provide and improve our services, including
                        personalized learning experiences.
                    </p>
                    <p>
                        <strong>Data Protection:</strong> We implement robust security measures to protect your
                        information from unauthorized access.
                    </p>
                </div>
            </div>
        </MainLayout>
    )
}

export default PrivacyPolicy
