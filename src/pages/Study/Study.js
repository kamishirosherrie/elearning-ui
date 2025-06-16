import classNames from 'classnames/bind'
import styles from './Study.module.scss'
import { useEffect, useState } from 'react'
import { getLessonBySlug, getLessonWithProgress } from '../../api/lessonApi'
import { useParams, useNavigate } from 'react-router-dom'
import { routes } from '../../routes/route'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faClose } from '@fortawesome/free-solid-svg-icons'
import CollapsibleSection from '../../components/CollapsibleSection/CollapsibleSection'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import { markLessonAsCompleted } from '../../api/lessonProgressApi'
import { useLoading } from '../../context/LoadingContext'

const cx = classNames.bind(styles)

function Study() {
    const { courseName, lessonName } = useParams()
    const navigate = useNavigate()
    const { setIsLoading } = useLoading()
    const [lesson, setLesson] = useState({})

    const [chapters, setChapters] = useState([])

    const [activeMobileMenu, setActiveMobileMenu] = useState(false)

    const hanleClickMenu = () => {
        setActiveMobileMenu((prev) => !prev)
    }

    const handleCloseMenu = () => {
        setActiveMobileMenu((prev) => !prev)
    }

    const handleNavigation = async (direction) => {
        let currentLessonIndex = -1
        let currentChapterIndex = -1

        chapters.forEach((chapter, chapterIndex) => {
            const lessonIndex = chapter.lessons.findIndex((lesson) => lesson.slug === lessonName)
            if (lessonIndex !== -1) {
                currentLessonIndex = lessonIndex
                currentChapterIndex = chapterIndex
            }
        })

        if (currentLessonIndex !== -1) {
            try {
                setIsLoading(true)

                if (direction === 'next') {
                    await markLessonAsCompleted(lesson?._id)

                    setChapters((prevChapters) =>
                        prevChapters.map((chapter, chapterIndex) =>
                            chapterIndex === currentChapterIndex
                                ? {
                                      ...chapter,
                                      lessons: chapter.lessons.map((lesson, lessonIndex) =>
                                          lessonIndex === currentLessonIndex
                                              ? { ...lesson, isCompleted: true }
                                              : lesson,
                                      ),
                                  }
                                : chapter,
                        ),
                    )

                    if (currentLessonIndex < chapters[currentChapterIndex].lessons.length - 1) {
                        const nextLesson = chapters[currentChapterIndex].lessons[currentLessonIndex + 1]
                        navigate(`${routes.study}/${courseName}/${nextLesson.slug}`)
                    } else if (currentChapterIndex < chapters.length - 1) {
                        const nextChapter = chapters[currentChapterIndex + 1]
                        const nextLesson = nextChapter.lessons[0]
                        navigate(`${routes.study}/${courseName}/${nextLesson.slug}`)
                    }
                } else if (direction === 'previous') {
                    if (currentLessonIndex > 0) {
                        const previousLesson = chapters[currentChapterIndex].lessons[currentLessonIndex - 1]
                        navigate(`${routes.study}/${courseName}/${previousLesson.slug}`)
                    } else if (currentChapterIndex > 0) {
                        const previousChapter = chapters[currentChapterIndex - 1]
                        const previousLesson = previousChapter.lessons[previousChapter.lessons.length - 1]
                        navigate(`${routes.study}/${courseName}/${previousLesson.slug}`)
                    }
                }
            } catch (error) {
                console.error('Error navigating lessons:', error)
            } finally {
                setIsLoading(false)
            }
        }
    }

    useEffect(() => {
        const getLesson = async () => {
            try {
                setIsLoading(true)
                const response = await getLessonBySlug(lessonName)

                setLesson({ ...response.lesson })
            } catch (error) {
                console.log('Error:', error)
            } finally {
                setIsLoading(false)
            }
        }

        const getListLessons = async () => {
            try {
                setIsLoading(true)
                const response = await getLessonWithProgress(courseName)
                console.log('Response:', response.chapters)

                setChapters(response.chapters)
            } catch (error) {
                console.log('Error:', error)
            } finally {
                setIsLoading(false)
            }
        }

        getLesson()
        getListLessons()
    }, [lessonName, courseName, setIsLoading])

    useEffect(() => {
        if (activeMobileMenu) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [activeMobileMenu])

    return (
        <MainLayout>
            <div className={cx('wrapper')}>
                <div className={cx('column')}>
                    <div className={cx('lesson')}>
                        <h3 className={cx('lesson-title')}>{lesson?.title}</h3>
                        <div dangerouslySetInnerHTML={{ __html: lesson?.content }}></div>
                    </div>
                </div>
                <div className={cx('column', { activeMobileMenu })}>
                    <h3 className={cx('title')}>
                        Danh sách bài học
                        {activeMobileMenu && (
                            <FontAwesomeIcon icon={faClose} className={cx('close')} onClick={handleCloseMenu} />
                        )}
                    </h3>
                    {chapters.map((chapter, indexChapter) => (
                        <div className={cx('chapter')} key={indexChapter}>
                            <CollapsibleSection key={indexChapter} title={`${chapter?.order} - ${chapter?.title}`}>
                                {chapter?.lessons?.map((lesson, indexLesson) => (
                                    <div key={indexLesson} className={cx('lesson-item')}>
                                        <a
                                            href={`${routes.study}/${courseName}/${lesson?.slug}`}
                                            className={cx('lesson-link')}
                                        >
                                            {lesson?.order} - {lesson?.title}
                                            {lesson?.isCompleted ? <FontAwesomeIcon icon={faCircleCheck} /> : null}
                                        </a>
                                        <div className={cx('quizze-item')}>
                                            {lesson?.quizzes?.map((quizze, indexQuizze) => (
                                                <a
                                                    href={`${routes.quizze}/${quizze?.slug}`}
                                                    className={cx('quizze-link')}
                                                    key={indexQuizze}
                                                >
                                                    {indexQuizze + 1} - {quizze?.title}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </CollapsibleSection>
                        </div>
                    ))}
                </div>
                <div className={cx('menu-mobile')} onClick={hanleClickMenu}>
                    <h3 className={cx('mobile-title')}>Danh sách bài học</h3>
                </div>
            </div>
            <div className={cx('navigation-buttons')}>
                <button onClick={() => handleNavigation('previous')} disabled={!lessonName}>
                    Bài trước
                </button>
                <button onClick={() => handleNavigation('next')} disabled={!lessonName}>
                    Bài tiếp theo
                </button>
            </div>
        </MainLayout>
    )
}

export default Study
