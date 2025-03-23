import classNames from 'classnames/bind'
import styles from './LessonDetail.module.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getLessonBySlug } from '../../api/lessonApi'

const cx = classNames.bind(styles)

function LessonDetail({ slug }) {
    const [lesson, setLesson] = useState({})

    useEffect(() => {
        const getLesson = async () => {
            try {
                const response = await getLessonBySlug(slug)
                setLesson(response.lesson)
            } catch (error) {
                console.log('Error:', error)
            }
        }
        getLesson()
    }, [slug])

    return (
        <div className={cx('wrapper')}>
            <h1>{lesson.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: lesson.content }}></div>
        </div>
    )
}

export default LessonDetail
