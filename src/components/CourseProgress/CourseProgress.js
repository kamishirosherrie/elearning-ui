import classNames from 'classnames/bind'
import styles from './CourseProgress.module.scss'

const cx = classNames.bind(styles)

function CourseProgress() {
    return (
        <div className={cx('wrapper')}>
            {courses.map((course) => (
                <div key={course.id} className={cx('course')}>
                    <div className={cx('course-title')}>{course.title}</div>
                    <LearningProgress progress={course.progress} />
                </div>
            ))}
        </div>
    )
}

export default CourseProgress
