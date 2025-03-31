import classNames from 'classnames/bind'
import styles from './Study.module.scss'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import { useEffect, useState } from 'react'
import { getLessonByCourseSlug, getLessonBySlug } from '../../api/lessonApi'
import { useParams } from 'react-router-dom'

const cx = classNames.bind(styles)

function Study() {
    const { courseName, lessonName } = useParams()
    const [lesson, setLesson] = useState({})
    const [lessons, setLessons] = useState([])

    useEffect(() => {
        const getLesson = async () => {
            try {
                const response = await getLessonBySlug(lessonName)

                setLesson({ ...response.lesson })
            } catch (error) {
                console.log('Error:', error)
            }
        }

        const getLessons = async () => {
            try {
                const response = await getLessonByCourseSlug(courseName)
                setLessons([...response.lessons])
            } catch (error) {
                console.log('Error:', error)
            }
        }

        getLesson()
        getLessons()
    }, [lessonName])

    return (
        <MainLayout>
            <div className={cx('wrapper')}>
                <div className={cx('column')}>
                    <div className={cx('lesson')}>
                        <h3 className={cx('lesson-title')}>{lesson?.title}</h3>
                        <div dangerouslySetInnerHTML={{ __html: lesson?.content }}></div>
                    </div>
                </div>
                <div className={cx('column')}>
                    {lessons.map((lesson, index) => (
                        <div className={cx('lesson')} key={index}>
                            <h3 className={cx('lesson-title')}>{lesson?.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}

export default Study
