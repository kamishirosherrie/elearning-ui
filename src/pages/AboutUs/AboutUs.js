import React from 'react'
import classNames from 'classnames/bind'
import styles from './AboutUs.module.scss'
import MainLayout from '../../layouts/MainLayout/MainLayout'

const cx = classNames.bind(styles)

function AboutUs() {
    return (
        <MainLayout title="About Us">
            <div className={cx('wrapper')}>
                <h1 className={cx('title')}>About Us</h1>
                <div className={cx('content')}>
                    <p>
                        Welcome to EMaster! We are dedicated to providing the best learning experience for TOEIC
                        preparation. Our mission is to help students achieve their goals with innovative tools and
                        personalized learning paths.
                    </p>
                    <p>
                        <strong>Our Address:</strong> Tầng 6, Số 3 đường Cầu Giấy, Quận Đống Đa, Thành phố Hà Nội, Việt
                        Nam
                    </p>
                    <p>
                        <strong>Contact Us:</strong>
                    </p>
                    <ul>
                        <li>Phone: +84 123 456 789</li>
                        <li>Email: support@emaster.com</li>
                        <li>Facebook: facebook.com/emaster</li>
                        <li>Instagram: instagram.com/emaster</li>
                    </ul>
                </div>
            </div>
        </MainLayout>
    )
}

export default AboutUs
