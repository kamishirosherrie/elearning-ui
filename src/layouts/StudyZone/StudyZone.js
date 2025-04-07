import classNames from 'classnames/bind'
import styles from './StudyZone.module.scss'

import Header from '../Header/Header'
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton'

const cx = classNames.bind(styles)

function StudyZone({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('children')}>{children}</div>
            <ScrollToTopButton />
        </div>
    )
}

export default StudyZone
