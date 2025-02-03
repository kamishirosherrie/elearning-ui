import React from 'react'
import classNames from 'classnames/bind'
import styles from './Home.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons/faCircleArrowDown'

import { image } from '../../assets/images/image'
import Header from '../../layouts/Header/Header'

const cx = classNames.bind(styles)

function Home() {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('banner')}>
                <div className={cx('home-image')}>
                    <img className={cx('home')} src={image.home} alt="home-img" />
                    <img className={cx('blink1')} src={image.blink} alt="blink-img" />
                    <img className={cx('blink2')} src={image.blink} alt="blink-img" />
                    {/* <span className={cx('text')}>Learning</span>
                    <span className={cx('sub-text')}>everyday</span> */}
                    <div className={cx('border')}>
                        <svg className="_7KaXww">
                            <defs>
                                <clipPath id="__id20">
                                    <path d="M8.285547450825005,0L331.1407507229809,0C335.71673220759436,0 339.4262981525002,3.7095659449058043 339.4262981525002,8.285547450825005L339.4262981525002,247.71445254210613C339.4262981525002,252.2904340480253 335.71673220759436,255.99999999293115 331.1407507229809,255.99999999293115L8.285547450825005,255.99999999293115C3.7095659449058043,255.99999999293115 0,252.2904340480253 0,247.71445254210613L0,8.285547450825005C0,3.7095659449058043 3.7095659449058043,0 8.285547450825005,0Z"></path>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>
                <div className={cx('banner-content')}>
                    <h1 className={cx('title')}>
                        Nền tảng học
                        <br />
                        và luyện thi <br /> thông minh
                    </h1>
                    <a href="#course" className={cx('see-more-btn')}>
                        Khám phá ngay
                    </a>
                </div>
            </div>
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
                        <a href="/ielts" className={cx('course-button')}>
                            <FontAwesomeIcon className={cx('course-icon')} icon={faCircleArrowDown} />
                        </a>
                    </div>

                    <div className={cx('course-item')}>
                        <span className={cx('course-title')}>TOEIC LISTENING & READING</span>
                        <span className={cx('course-description')}>
                            Tập trung phát triển kỹ năng nghe hiểu và đọc hiểu trong môi trường tiếng Anh chuyên nghiệp.
                        </span>
                        <a href="/toeic" className={cx('course-button')}>
                            <FontAwesomeIcon className={cx('course-icon')} icon={faCircleArrowDown} />
                        </a>
                    </div>

                    <div className={cx('course-item')}>
                        <span className={cx('course-title')}>TOEIC SPEAKING & WRITING</span>
                        <span className={cx('course-description')}>
                            Nhằm nâng cao kỹ năng nói và viết tiếng Anh để giao tiếp hiệu quả trong công việc.
                        </span>
                        <a href="/toeic" className={cx('course-button')}>
                            <FontAwesomeIcon className={cx('course-icon')} icon={faCircleArrowDown} />
                        </a>
                    </div>

                    <div className={cx('course-item')}>
                        <span className={cx('course-title')}>TOEIC 4 KỸ NĂNG</span>
                        <span className={cx('course-description')}>
                            Lộ trình học tinh gọn, bật mí bí kíp về đích nhanh chóng, dễ dàng đạt mục tiêu.
                        </span>
                        <a href="/toeic" className={cx('course-button')}>
                            <FontAwesomeIcon className={cx('course-icon')} icon={faCircleArrowDown} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
