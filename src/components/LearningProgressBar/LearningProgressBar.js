import classNames from 'classnames/bind'
import styles from './LearningProgressBar.module.scss'

const cx = classNames.bind(styles)

function getMood(progress) {
    if (progress === 100) return '🔥 Quá đỉnh luôn!'
    if (progress >= 75) return '💪 Sắp full cây rồi!'
    if (progress >= 50) return '🚀 Tiến độ ổn áp!'
    if (progress >= 25) return '✨ Cố thêm chút nữa!'
    return '😴 Mới bắt đầu hen~'
}

function LessonProgressBar({ progress = 0, title = '' }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>{title}</div>
            <div className={cx('bar')}>
                <div className={cx('fill')} style={{ width: `${progress}%` }} />
            </div>
            <div className={cx('percentage')}>{progress}% hoàn thành</div>
            <div className={cx('mood')}>{getMood(progress)}</div>
        </div>
    )
}

export default LessonProgressBar
