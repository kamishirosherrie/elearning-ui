import classNames from 'classnames/bind'
import styles from './MainLayout.module.scss'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton'

const cx = classNames.bind(styles)

function MainLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('children')}>{children}</div>
            <Footer />
            <ScrollToTopButton />
        </div>
    )
}

export default MainLayout
