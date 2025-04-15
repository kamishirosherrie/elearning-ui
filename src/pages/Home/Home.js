import React, { useContext, useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Home.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getCourse } from '../../api/courseApi'
import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Login from '../../components/Login/Login'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import ModalPopup from '../../components/ModalPopup/ModalPopup'
import Register from '../../components/Register/Register'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import AuthContext from '../../context/AuthContext'
import { routes } from '../../routes/route'
import { image } from '../../assets/images/image'

const cx = classNames.bind(styles)

function Home() {
    const { user } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(true)
    const [courses, setCourse] = useState([])
    const ref = useRef()

    const [inView, setInView] = useState(false)

    const handleStartNow = () => {
        setIsOpen(true)
    }

    const handleExplore = () => {
        window.scrollTo({
            top: document.getElementById('course').offsetTop,
            behavior: 'smooth',
        })
    }

    const closeModal = () => {
        setIsOpen(false)
        setIsLoginOpen(true)
    }

    const handleClickRegister = () => {
        setIsLoginOpen(false)
    }

    const handleClickLogin = () => {
        setIsLoginOpen(true)
    }

    useEffect(() => {
        // document.title = 'Trang chủ'
        const getAllCourse = async () => {
            const response = await getCourse()
            setCourse(response.courses)
        }

        getAllCourse()
    }, [user])

    useEffect(() => {
        const currentElem = ref.current
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                setInView(entry.isIntersecting)
            },
            {
                threshold: 0.3,
            },
        )

        if (currentElem) observer.observe(currentElem)

        return () => {
            if (currentElem) observer.unobserve(currentElem)
        }
    }, [])

    return (
        <div className={cx('wrapper')}>
            <MainLayout>
                <div className={cx('banner')}>
                    <div className={cx('image')}>
                        <img src={image.banner} alt="banner" />
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('title')}>
                            <h1>
                                Học tiếng Anh hiệu quả <br /> với phương pháp luyện tập <br />
                                thông minh
                            </h1>
                        </div>
                        <div className={cx('description')}>
                            Luyện tập mọi kỹ năng với bài tập phong phú, phù hợp với mọi trình độ.
                        </div>
                        <div className={cx('button-group')}>
                            {user ? (
                                <Link to={routes.myCourse}>
                                    <Button primary hover large className={cx('btn-primary')}>
                                        Bắt đầu ngay
                                    </Button>
                                </Link>
                            ) : (
                                <Button primary hover large className={cx('btn-primary')} onClick={handleStartNow}>
                                    Bắt đầu ngay
                                </Button>
                            )}
                            <Button outline hover large className={cx('btn-outline')} onClick={handleExplore}>
                                Khám phá
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('why-choose-us')}>
                    <h2 className={cx('why-choose-us-heading')}>Tại sao bạn nên chọn chúng tôi?</h2>
                    <p className={cx('why-choose-us-description')}>
                        Chinh phục tiếng Anh dễ dàng với lộ trình cá nhân hóa, công nghệ hỗ trợ và nội dung chất lượng
                        cao.
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
                <div ref={ref} className={cx('course', { inView })} id="course">
                    <div className={cx('course-content')}>
                        <h3 className={cx('course-sub-title')}>Tối ưu hành trình</h3>
                        <h2 className={cx('course-heading')}>Với các khóa học nổi bật</h2>
                        <p className={cx('course-sub-description')}>
                            Học ngoại ngữ thật dễ dàng với lộ trình Học & Luyện Thi toàn diện, được cá nhân hóa riêng
                            biệt.
                        </p>
                        {user ? (
                            <Link to={routes.myCourse} className={cx('btn-link')}>
                                <Button hover blue className={cx('course-button')}>
                                    Học ngay
                                </Button>
                            </Link>
                        ) : (
                            <Button hover blue className={cx('course-button')} onClick={handleStartNow}>
                                Học ngay
                            </Button>
                        )}
                    </div>
                    <div className={cx('course-list')}>
                        {courses.map((item, index) => (
                            <div className={cx('course-item')} key={index}>
                                <span className={cx('course-title')}>{item.title}</span>
                                <span className={cx('course-description')}>{item.shortDescription}</span>
                                <Link to={`/course/${item.slug}`} className={cx('course-link')}>
                                    <FontAwesomeIcon className={cx('course-icon')} icon={faArrowDown} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </MainLayout>
            <ModalPopup isOpen={isOpen} closeModal={closeModal}>
                {isLoginOpen ? (
                    <Login handleClickRegister={handleClickRegister} redirect={true} />
                ) : (
                    <Register handleClickLogin={handleClickLogin} redirect={true} />
                )}
            </ModalPopup>
        </div>
    )
}

export default Home
