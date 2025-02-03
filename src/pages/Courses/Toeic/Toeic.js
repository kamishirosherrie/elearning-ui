import classNames from 'classnames/bind'
import styles from './Toeic.module.scss'
import Course from '../../../components/Courses/Course'

const cx = classNames.bind(styles)

function Toeic() {
    return (
        <div className={cx('wrapper')}>
            <Course />
        </div>
    )
}

export default Toeic
