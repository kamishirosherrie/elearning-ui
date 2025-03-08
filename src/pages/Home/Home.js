import React from 'react'
import classNames from 'classnames/bind'
import styles from './Home.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons/faCircleArrowDown'

import { image } from '../../assets/images/image'
import Header from '../../layouts/HeaderOnly/HeaderOnly'

const cx = classNames.bind(styles)

function Home() {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('course')} id="course">
                <h1 className={cx('sub-title')}>
                    Tinh thông mọi ngôn ngữ <br /> với bộ chương trình đào tạo <br /> chất lượng cao
                </h1>
                <div className={cx('course-list')}>
                    <div className={cx('course-item')}>
                        <span className={cx('course-title')}>IELTS</span>
                        <span className={cx('course-description')}>
                            Học toàn diện 4 kỹ năng, chấm chữa cặn kẽ cùng giáo viên, luyện tập thông minh với phòng ảo Prep AI.
                        </span>
                        <a href="/course/ielts" className={cx('course-button')}>
                            <FontAwesomeIcon className={cx('course-icon')} icon={faCircleArrowDown} />
                        </a>
                    </div>

                    <div className={cx('course-item')}>
                        <span className={cx('course-title')}>TOEIC LISTENING & READING</span>
                        <span className={cx('course-description')}>
                            Tập trung phát triển kỹ năng nghe hiểu và đọc hiểu trong môi trường tiếng Anh chuyên nghiệp.
                        </span>
                        <a href="/course/toeic-listening-and-reading" className={cx('course-button')}>
                            <FontAwesomeIcon className={cx('course-icon')} icon={faCircleArrowDown} />
                        </a>
                    </div>

                    <div className={cx('course-item')}>
                        <span className={cx('course-title')}>TOEIC SPEAKING & WRITING</span>
                        <span className={cx('course-description')}>
                            Nhằm nâng cao kỹ năng nói và viết tiếng Anh để giao tiếp hiệu quả trong công việc.
                        </span>
                        <a href="/course/toeic-speaking-and-writing" className={cx('course-button')}>
                            <FontAwesomeIcon className={cx('course-icon')} icon={faCircleArrowDown} />
                        </a>
                    </div>

                    <div className={cx('course-item')}>
                        <span className={cx('course-title')}>TOEIC 4 KỸ NĂNG</span>
                        <span className={cx('course-description')}>
                            Lộ trình học tinh gọn, bật mí bí kíp về đích nhanh chóng, dễ dàng đạt mục tiêu.
                        </span>
                        <a href="/course/toeic-4-ky-nang" className={cx('course-button')}>
                            <FontAwesomeIcon className={cx('course-icon')} icon={faCircleArrowDown} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
