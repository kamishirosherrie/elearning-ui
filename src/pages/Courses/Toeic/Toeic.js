import classNames from 'classnames/bind'
import styles from './Toeic.module.scss'
import Header from '../../../layouts/Header/Header'
import Lesson from '../../../components/Lesson/Lesson'

const cx = classNames.bind(styles)

function Toeic() {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <h1>Course description</h1>
            <h1>Course content</h1>
            <Lesson courseName="TOEIC LISTENING & READING" />
        </div>
    )
}

export default Toeic
