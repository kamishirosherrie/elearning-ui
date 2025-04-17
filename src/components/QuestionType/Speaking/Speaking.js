import classNames from 'classnames/bind'
import styles from './Speaking.module.scss'

const cx = classNames.bind(styles)

function Speaking() {
    return (
        <div className={cx('speaking')}>
            <span>Speaking</span>
        </div>
    )
}

export default Speaking
