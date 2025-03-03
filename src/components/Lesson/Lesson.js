import { useEffect, useState } from 'react'
import axios from 'axios'

import classNames from 'classnames/bind'
import styles from './Lesson.module.scss'

const cx = classNames.bind(styles)

function Lesson({ courseName }) {
    const [lessons, setLessons] = useState([])
    const [courseSlug, setCourseSlug] = useState('')

    useEffect(() => {
        const getLessons = async () => {
            try {
                const response = await axios.get(`http://localhost:8017/lesson/${courseName}`)
                setLessons((prev) => [...prev, ...response.data.lessons])
                setCourseSlug(response.data.courseSlug)
                console.log('Course slug:', response.data.courseSlug)
                console.log('Lessons:', response.data.lessons)
            } catch (error) {
                console.log('Error:', error)
            }
        }
        getLessons()
    }, [])
    return (
        <div className={cx('wrapper')}>
            {lessons.map((item, index) => (
                <div key={index} className={cx('lesson')}>
                    <h1>
                        Bài {index + 1} - {item.title}
                    </h1>
                    <a className={cx('learn-now')} href={`/${courseSlug}/${item.slug}`}>
                        Học ngay
                    </a>
                </div>
            ))}
            {/* <h1>{htmlContent.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: htmlContent.content }}></div> */}
        </div>
    )
}

export default Lesson
