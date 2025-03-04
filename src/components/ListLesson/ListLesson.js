import { useEffect, useState } from 'react'
import axios from 'axios'

import classNames from 'classnames/bind'
import styles from './ListLesson.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function ListLesson({ slug }) {
    const [lessons, setLessons] = useState([])
    const [courseSlug, setCourseSlug] = useState('')

    useEffect(() => {
        const getLessons = async () => {
            try {
                const response = await axios.get(`http://localhost:8017/lesson/${slug}`)
                setLessons((prev) => [...prev, ...response.data.lessons])
                setCourseSlug(response.data.courseSlug)
                console.log('Course slug:', response.data.courseSlug)
                console.log('Lessons:', response.data.lessons)
            } catch (error) {
                console.log('Error:', error)
            }
        }
        getLessons()
    }, [slug])
    return (
        <div className={cx('wrapper')}>
            {lessons.map((item, index) => (
                <div key={index} className={cx('lesson')}>
                    <h1>
                        Bài {index + 1} - {item.title}
                    </h1>
                    <Link className={cx('learn-now')} to={`/${courseSlug}/${item.slug}`}>
                        Học ngay
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default ListLesson
