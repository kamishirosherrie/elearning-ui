import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Lesson.module.scss'

import LessonDetail from '../../components/LessonDetail/LessonDetail'
import { useEffect, useState } from 'react'
import axios from 'axios'

const cx = classNames.bind(styles)
function Lesson() {
    const [quizze, setQuizze] = useState({})
    const slug = useParams().lessonName

    useEffect(() => {
        const getQuizzeInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8017/quizze/getQuizzeByLesson/${slug}`)
                setQuizze(response.data.quizze)
                console.log('Quizze:', response.data.quizze)
            } catch (error) {
                console.log('Error:', error)
            }
        }
        getQuizzeInfo()
    }, [slug])

    return (
        <div className={cx('wrapper')}>
            <LessonDetail slug={slug} />
            <div className={cx('navigation-link')}>
                <button className={cx('privious')} onClick={() => window.history.back()}>
                    Quay lại
                </button>
                <Link to={`/lesson/quizze/${quizze.slug}`} className={cx('next')}>
                    Làm bài kiểm tra
                </Link>
            </div>
        </div>
    )
}

export default Lesson
