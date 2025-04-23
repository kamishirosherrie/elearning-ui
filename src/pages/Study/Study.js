import classNames from 'classnames/bind'
import styles from './Study.module.scss'
import { useEffect, useState } from 'react'
import { getLessonByCourseSlug, getLessonBySlug } from '../../api/lessonApi'
import { useParams } from 'react-router-dom'
import { routes } from '../../routes/route'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import CollapsibleSection from '../../components/CollapsibleSection/CollapsibleSection'
import MainLayout from '../../layouts/MainLayout/MainLayout'

const cx = classNames.bind(styles)

function Study() {
    const { courseName, lessonName } = useParams()
    const [lesson, setLesson] = useState({})

    const [chapters, setChapters] = useState([])

    const [activeMobileMenu, setActiveMobileMenu] = useState(false)

    const hanleClickMenu = () => {
        setActiveMobileMenu((prev) => !prev)
    }

    const handleCloseMenu = () => {
        setActiveMobileMenu(false)
    }

    useEffect(() => {
        const getLesson = async () => {
            try {
                const response = await getLessonBySlug(lessonName)

                setLesson({ ...response.lesson })
            } catch (error) {
                console.log('Error:', error)
            }
        }

        const getListLessons = async () => {
            try {
                const response = await getLessonByCourseSlug(courseName)
                console.log('Response:', response.chapters)

                setChapters(response.chapters)
            } catch (error) {
                console.log('Error:', error)
            }
        }

        getLesson()
        getListLessons()
    }, [lessonName, courseName])

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
        </MainLayout>
    )
}

export default Study
