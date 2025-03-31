import classNames from 'classnames/bind'
import styles from './CourseDetail.module.scss'
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { getCourseBySlug } from '../../api/courseApi'
import ListLesson from '../../components/ListLesson/ListLesson'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import Button from '../../components/Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import AuthContext from '../../context/AuthContext'
import ModalPopup from '../../components/ModalPopup/ModalPopup'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import Login from '../../components/Login/Login'
import Register from '../../components/Register/Register'
import Checkout from '../../components/Checkout/Checkout'

const cx = classNames.bind(styles)

function CourseDetail() {
    const slug = useParams().courseName
    const { user } = useContext(AuthContext)

    const [course, setCourse] = useState({})
    const [active, setActive] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(true)

    const handleClickChapter = (index) => {
        setActive((prev) => ({ ...prev, [index]: !prev[index] }))
    }

    const handleClick = () => {
        setIsOpen(true)
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
        const getCourseInfo = async () => {
            const response = await getCourseBySlug(slug)
            setCourse(response)
        }
        console.log(slug)

        getCourseInfo()
    }, [slug])

    return (
        <MainLayout>
            <div className={cx('wrapper')}>
                <div className={cx('column')}>
                    <h1 className={cx('title')}>{course?.title}</h1>
                    <span>{course?.description}</span>
                    <div className={cx('intro')}>
                        <div className={cx('intro-item')}>
                            <p>Giới thiệu khóa học</p>
                            <span>
                                Bạn đang tìm kiếm một khóa học tiếng Anh toàn diện giúp nâng cao cả 4 kỹ năng: Đọc,
                                Nghe, Viết, Nói? Khóa học của chúng tôi được thiết kế dành riêng cho người học ở mọi
                                trình độ, từ cơ bản đến nâng cao. Với phương pháp học tập hiện đại và giáo trình bài
                                bản, bạn sẽ tự tin sử dụng tiếng Anh trong mọi tình huống.
                            </span>
                        </div>
                        <div className={cx('intro-item')}>
                            <p>Lợi ích khi tham gia khóa học</p>
                            <span>Phát triển các kĩ năng Đọc - Nghe</span>
                            <span>Học tập, tương tác linh hoạt</span>
                            <span>Lộ Trình Cá Nhân Hóa</span>
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <p>Nội dung khóa học</p>
                        <div className={cx('content-info')}>
                            <span>4 chương</span>
                            <span>-</span>
                            <span>12 bài học</span>
                        </div>
                    </div>
                    <div className={cx('chapter')}>
                        <div
                            className={cx('chapter-title', { active: active[1] })}
                            onClick={() => handleClickChapter(1)}
                        >
                            <div className={cx('heading')}>
                                Chương 1: Khái niệm cần biết
                                <span>
                                    {active[1] ? (
                                        <FontAwesomeIcon icon={faMinus} className={cx('minus')} />
                                    ) : (
                                        <FontAwesomeIcon icon={faPlus} className={cx('plus')} />
                                    )}
                                </span>
                            </div>
                            <div className={cx('collapsible')}>
                                <ListLesson slug={slug} />
                            </div>
                        </div>
                        <div
                            className={cx('chapter-title', { active: active[2] })}
                            onClick={() => handleClickChapter(2)}
                        >
                            <div className={cx('heading')}>
                                Chương 1: Khái niệm cần biết
                                <span>
                                    {active[2] ? (
                                        <FontAwesomeIcon icon={faMinus} className={cx('minus')} />
                                    ) : (
                                        <FontAwesomeIcon icon={faPlus} className={cx('plus')} />
                                    )}
                                </span>
                            </div>
                            <div className={cx('collapsible')}>
                                <ListLesson slug={slug} />
                            </div>
                        </div>
                        <div
                            className={cx('chapter-title', { active: active[3] })}
                            onClick={() => handleClickChapter(3)}
                        >
                            <div className={cx('heading')}>
                                Chương 1: Khái niệm cần biết
                                <span>
                                    {active[3] ? (
                                        <FontAwesomeIcon icon={faMinus} className={cx('minus')} />
                                    ) : (
                                        <FontAwesomeIcon icon={faPlus} className={cx('plus')} />
                                    )}
                                </span>
                            </div>
                            <div className={cx('collapsible')}>
                                <ListLesson slug={slug} />
                            </div>
                        </div>{' '}
                    </div>
                </div>
                <div className={cx('column')}>
                    <span className={cx('img')}></span>
                    <span className={cx('price')}>1.200.000VNĐ</span>
                    <Button blue onClick={handleClick}>
                        Đăng ký học
                    </Button>
                    <span>Học mọi lúc, mọi nơi</span>
                </div>
            </div>
            <ModalPopup isOpen={isOpen} closeModal={closeModal}>
                {user ? (
                    <Checkout course={course} />
                ) : isLoginOpen ? (
                    <Login handleClickRegister={handleClickRegister} redirect={false} />
                ) : (
                    <Register handleClickLogin={handleClickLogin} redirect={false} />
                )}
            </ModalPopup>
            <ScrollToTop />
        </MainLayout>
    )
}

export default CourseDetail
