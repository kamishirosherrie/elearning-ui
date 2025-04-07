import { useEffect, useState } from 'react'

import classNames from 'classnames/bind'
import styles from './ListLesson.module.scss'
import { Link } from 'react-router-dom'
import { getLessonByCourseSlug } from '../../api/lessonApi'

const cx = classNames.bind(styles)

function ListLesson({ slug, subscribe }) {
    const [lessons, setLessons] = useState([])
    const [courseSlug, setCourseSlug] = useState('')

    useEffect(() => {
        const getLessons = async () => {
            try {
                const response = await getLessonByCourseSlug(slug)
                setLessons((prev) => [...prev, ...response.lessons])
                setCourseSlug(response.courseSlug)
            } catch (error) {
                console.log('Error:', error)
            }
        }
        getLessons()
    }, [slug])
    return (
        // viết lại study và lesson
        <div className={cx('wrapper')}>
            {lessons.map((item, index) => (
                <div key={index} className={cx('lesson')}>
                    <div className={cx('lesson-name')}>
                        Bài {index + 1} - {item.title}
                    </div>

                    {subscribe ? (
                        <Link className={cx('learn-now')} to={`/${courseSlug}/${item.slug}`}>
                            Học ngay
                        </Link>
                    ) : null}
                </div>
            ))}
        </div>
    )
}

export default ListLesson
