import classNames from 'classnames/bind'
import styles from './MainLayout.module.scss'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import Chatbot from '../../components/Chatbot/Chatbot'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'

const cx = classNames.bind(styles)

function MainLayout({ children }) {
    const { user } = useContext(AuthContext)
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('children')}>{children}</div>
            <Footer />
            <ScrollToTop />
            <ScrollToTopButton />
            {user && <Chatbot />}
        </div>
    )
}

export default MainLayout
