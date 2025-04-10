import classNames from 'classnames/bind'
import styles from './CourseDetail.module.scss'
import { useParams } from 'react-router-dom'
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
import { getLessonByCourseSlug, getTotalLessonNumber } from '../../api/lessonApi'

const cx = classNames.bind(styles)

function CourseDetail() {
    const { user } = useContext(AuthContext)
    const slug = useParams().courseName

    const [course, setCourse] = useState({})
    const [chapters, setChapters] = useState([])
    const [firstLesson, setFirstLesson] = useState({})
    const [totalLesson, setTotalLesson] = useState(0)

    const [isEnrolled, setIsEnrolled] = useState(false)

    const [active, setActive] = useState({})
    const [activeBtn, setActiveBtn] = useState({})
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

            if (response._id) {
                try {
                    const lessons = await getLessonByCourseSlug(slug)
                    const total = await getTotalLessonNumber(response._id)
                    setTotalLesson(total)

                    setChapters(lessons.chapters)
                    setFirstLesson(lessons.chapters[0].lessons[0])
                } catch (error) {
                    console.log('Get lessons failed: ', error)
                }

                if (user) {
                    try {
                        const enrollment = await getCourseEnrollment({ courseId: response._id, userId: user._id })
                        if (enrollment.courseEnrollment) {
                            setIsEnrolled(true)
                        }
                    } catch (error) {
                        console.log('Get course enrollment failed: ', error)
                    }
                }
            }
        }
        getCourseInfo()
    }, [slug, user])

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > window.innerHeight / 3) {
                setActiveBtn(true)
            } else {
                setActiveBtn(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <MainLayout>
            <div className={cx('wrapper')}>
                <div className={cx('column')}>
                    <h1 className={cx('title')}>{course?.title}</h1>
                    <span>{course?.shortDescription}</span>
                    <div className={cx('intro')} dangerouslySetInnerHTML={{ __html: course?.description }} />
                    <div className={cx('content')}>
                        <p>Nội dung khóa học</p>
                        <div className={cx('content-info')}>
                            <span>{chapters.length} chương</span>
                            <span>-</span>
                            <span>{totalLesson} bài học</span>
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
                        <Button className={cx('button')} href={`${routes.study}/${slug}/${firstLesson.slug}`} blue>
                            Học ngay
                        </Button>
                    ) : (
                        <Button className={cx('button')} blue onClick={handleClick}>
                            Đăng ký học
                        </Button>
                    )}
                </div>
            </div>
            {isEnrolled ? (
                <Button
                    className={cx('button', 'mobile-button', { activeBtn })}
                    href={`${routes.study}/${slug}/${firstLesson.slug}`}
                    blue
                >
                    Học ngay
                </Button>
            ) : (
                <Button className={cx('button', 'mobile-button', { activeBtn })} blue onClick={handleClick}>
                    Đăng ký học
                </Button>
            )}
            <ModalPopup isOpen={isOpen} closeModal={closeModal}>
                {user ? (
                    <Checkout course={course} setClose={setIsOpen} setIsEnrolled={setIsEnrolled} />
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
