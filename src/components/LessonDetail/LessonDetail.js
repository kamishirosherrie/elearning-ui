import classNames from 'classnames/bind'
import styles from './LessonDetail.module.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'

const cx = classNames.bind(styles)

function LessonDetail({ slug }) {
    const [lesson, setLesson] = useState({})

    useEffect(() => {
        const getLesson = async () => {
            try {
                const response = await axios.get(`http://localhost:8017/lesson/course/${slug}`)
                setLesson(response.data.lesson)
            } catch (error) {
                console.log('Error:', error)
            }
        }
        getLesson()
    }, [])

    return (
        <div className={cx('wrapper')}>
            <h1>{lesson.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: lesson.content }}></div>
        </div>
    )
}

export default LessonDetail
