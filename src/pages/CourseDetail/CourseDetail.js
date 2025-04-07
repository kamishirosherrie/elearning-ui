import classNames from 'classnames/bind'
import styles from './CourseDetail.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

import { getCourseBySlug, getCourseEnrollment } from '../../api/courseApi'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import Button from '../../components/Button/Button'
import AuthContext from '../../context/AuthContext'
import ModalPopup from '../../components/ModalPopup/ModalPopup'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import Login from '../../components/Login/Login'
import Register from '../../components/Register/Register'
import Checkout from '../../components/Checkout/Checkout'
import { routes } from '../../routes/route'
import { getLessonByCourseSlug } from '../../api/lessonApi'

const cx = classNames.bind(styles)

function CourseDetail() {
    const { user } = useContext(AuthContext)
    const slug = useParams().courseName
    const navigate = useNavigate()

    const [course, setCourse] = useState({})
    const [chapters, setChapters] = useState([])
    const [firstLesson, setFirstLesson] = useState({})

    const [isEnrolled, setIsEnrolled] = useState(false)

    const [active, setActive] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(true)

    const handleClickChapter = (index) => {
        setActive((prev) => ({ ...prev, [index]: !prev[index] }))
    }

    const handleClick = () => {
        setIsOpen(true)
    }

    const handleStartNow = () => {
        navigate(routes.myCourse)
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

            if (user && course._id) {
                try {
                    const enrollment = await getCourseEnrollment({ courseId: course._id, userId: user._id })
                    if (enrollment.courseEnrollment) {
                        setIsEnrolled(true)
                    }

                    const lessons = await getLessonByCourseSlug(slug)
                    setChapters(lessons.chapters)
                    setFirstLesson(lessons.chapters[0].lessons[0])
                } catch (error) {
                    console.log('Get course enrollment failed: ', error)
                }
            }
        }
        getCourseInfo()
    }, [slug, course._id, user])

    return (
        <MainLayout>
            <div className={cx('wrapper')}>
                <div className={cx('column')}>
                    <h1 className={cx('title')}>{course?.title}</h1>
                    <span>{course?.shortDescription}</span>
                    <div className={cx('intro')}>
                        <div dangerouslySetInnerHTML={{ __html: course?.description }}></div>
                        <div className={cx('intro-item')}></div>
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
                        {chapters?.map((chapter, index) => (
                            <div
                                key={index}
                                className={cx('chapter-title', { active: active[index] })}
                                onClick={() => handleClickChapter(index)}
                            >
                                <div className={cx('heading')}>
                                    <span>
                                        Chương {chapter?.order} - {chapter?.title}
                                    </span>
                                    <span>
                                        {active[index] ? (
                                            <FontAwesomeIcon icon={faMinus} className={cx('minus')} />
                                        ) : (
                                            <FontAwesomeIcon icon={faPlus} className={cx('plus')} />
                                        )}
                                    </span>
                                </div>
                                <div className={cx('collapsible')}>
                                    {chapter?.lessons?.map((lesson, index) => (
                                        <div key={index} className={cx('lesson')}>
                                            <p>
                                                Bài {lesson.order} - {lesson.title}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('column')}>
                    <span className={cx('img')}></span>
                    <span className={cx('price')}>1.200.000VNĐ</span>
                    {isEnrolled ? (
                        <Button href={`${routes.study}/${slug}/${firstLesson.slug}`} blue onClick={handleStartNow}>
                            Học ngay
                        </Button>
                    ) : (
                        <Button blue onClick={handleClick}>
                            Đăng ký học
                        </Button>
                    )}
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
