import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Home.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons/faCircleArrowDown'

import { getCourse } from '../../api/courseApi'
import { Link } from 'react-router-dom'
import Header from '../../layouts/Header/Header'
import Button from '../../components/Button/Button'
import Footer from '../../layouts/Footer/Footer'
import ScrollTop from '../../components/ScrollTop/ScrollTop'

const cx = classNames.bind(styles)

function Home() {
    const [courses, setCourse] = useState([])

    useEffect(() => {
        document.title = 'Trang chủ'
        const getAllCourse = async () => {
            const response = await getCourse()
            setCourse(response.courses)
        }

        getAllCourse()
    }, [])
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('banner')}>
                <div className={cx('image')}></div>
                <div className={cx('content')}>
                    <div className={cx('title')}>
                        <h1>Học tiếng Anh hiệu quả với phương pháp luyện tập thông minh</h1>
                    </div>
                    <div className={cx('description')}>
                        Luyện tập mọi kỹ năng với bài tập phong phú, phù hợp với mọi trình độ.
                    </div>
                    <div className={cx('button-group')}>
                        <Button primary hover large className={cx('btn-primary')}>
                            Bắt đầu ngay
                        </Button>
                        <Button outline hover large className={cx('btn-outline')}>
                            Khám phá
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('course')} id="course">
                <div className={cx('course-content')}>
                    <h3 className={cx('course-sub-title')}>Tối ưu hành trình</h3>
                    <h2 className={cx('course-heading')}>Với các khóa học nổi bật</h2>
                    <p className={cx('course-sub-description')}>
                        Học ngoại ngữ thật dễ dàng với lộ trình Học & Luyện Thi toàn diện, được cá nhân hóa riêng biệt.
                    </p>
                    <Button hover pink className={cx('course-button')}>
                        Học ngay
                    </Button>
                </div>
                <div className={cx('course-list')}>
                    {courses.map((item, index) => (
                        <div className={cx('course-item')} key={index}>
                            <span className={cx('course-title')}>{item.title}</span>
                            <span className={cx('course-description')}>{item.shortDescription}</span>
                            <Link to={`/course/${item.slug}`} className={cx('course-button')}>
                                <FontAwesomeIcon className={cx('course-icon')} icon={faCircleArrowDown} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('why-choose-us')}>
                <h2 className={cx('why-choose-us-heading')}>Tại sao bạn nên chọn chúng tôi?</h2>
                <p className={cx('why-choose-us-description')}>
                    Chinh phục tiếng Anh dễ dàng với lộ trình cá nhân hóa, công nghệ hỗ trợ và nội dung chất lượng cao.
                </p>
                <div className={cx('why-choose-us-list')}>
                    <div className={cx('why-choose-us-content')}>
                        <span>+30000</span>
                        <span>người đã được tạo lộ trình học</span>
                    </div>
                    <div className={cx('why-choose-us-content')}>
                        <span>+5000</span>
                        <span>học viên thi đỗ TOEIC quốc tế</span>
                    </div>
                    <div className={cx('why-choose-us-content')}>
                        <span>TOP 1</span>
                        <span>Đào tạo TOEIC tại Hà Nội</span>
                    </div>
                    <div className={cx('why-choose-us-content')}>
                        <span>TOP 1</span>
                        <span>Đào tạo TOEIC 4 Kỹ năng tại Hà Nội</span>
                    </div>
                </div>
            </div>
            <Footer />
            <ScrollTop />
        </div>
    )
}

export default Home
