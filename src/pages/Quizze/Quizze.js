import classNames from 'classnames/bind'
import styles from './Quizze.module.scss'

const cx = classNames.bind(styles)

function Quizze() {
    return (
        <div className={cx('wrapper')}>
            <h1>Quizze title</h1>
        </div>
    )
}

export default Quizze
