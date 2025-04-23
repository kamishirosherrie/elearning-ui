import classNames from 'classnames/bind'
import styles from './StudyZone.module.scss'

import Header from '../Header/Header'
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton'
import Footer from '../Footer/Footer'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'

const cx = classNames.bind(styles)

function StudyZone({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('children')}>{children}</div>
            <ScrollToTop />
            <ScrollToTopButton />
            <Footer />
        </div>
    )
}

export default StudyZone
