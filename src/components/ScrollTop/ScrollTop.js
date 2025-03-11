import classNames from 'classnames/bind'
import styles from './ScrollTop.module.scss'

const cx = classNames.bind(styles)

function ScrollTop() {
    return (
        <div className={cx('scroll-top')}>
            <i className="fas fa-arrow-up"></i>
        </div>
    )
}

export default ScrollTop
