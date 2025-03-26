import classNames from 'classnames/bind'
import styles from './MainLayout.module.scss'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ScrollTop from '../../components/ScrollTop/ScrollTop'

const cx = classNames.bind(styles)

function MainLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('children')}>{children}</div>
            <Footer />
            <ScrollTop />
        </div>
    )
}

export default MainLayout
