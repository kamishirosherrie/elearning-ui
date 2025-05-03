import classNames from 'classnames/bind'
import styles from './MainAccount.module.scss'
import Sidebar from '../Sidebar/Sidebar'
import Dashboard from '../Dashboard/Dashboard'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import Footer from '../Footer/Footer'
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton'
import Header from '../Header/Header'
import Chatbot from '../../components/Chatbot/Chatbot'

const cx = classNames.bind(styles)

function MainAccount({ title, children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <Dashboard>
                    <div className={cx('user-info')}>
                        <h1 className={cx('title')}>{title}</h1>
                        {children}
                    </div>
                </Dashboard>
            </div>
            <ScrollToTop />
            <ScrollToTopButton />
            <Chatbot />
            <Footer />
        </div>
    )
}

export default MainAccount
