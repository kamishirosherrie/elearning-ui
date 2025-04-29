import classNames from 'classnames/bind'
import styles from './CourseProgress.module.scss'
import { useEffect, useState } from 'react'
import { getLessonProgress } from '../../api/lessonProgressApi'
import LessonProgressBar from '../LearningProgressBar/LearningProgressBar'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../routes/route'

const cx = classNames.bind(styles)

function CourseProgress() {
    const navigate = useNavigate()
    const [progress, setProgress] = useState([])

    const handleClick = (courseSlug) => {
        navigate(`${routes.course}/${courseSlug}`)
    }

    useEffect(() => {
        const getProgress = async () => {
            const response = await getLessonProgress()
            setProgress(response.courseProgress)
            console.log(response.courseProgress)
        }

        getProgress()
    }, [])

    return (
        <div className={cx('wrapper')}>
            {progress.map((course) => (
                <div key={course.courseId} className={cx('course')} onClick={() => handleClick(course.courseSlug)}>
                    <LessonProgressBar progress={course.completionPercentage} title={course.courseTitle} />
                </div>
            ))}
        </div>
    )
}

export default CourseProgress
