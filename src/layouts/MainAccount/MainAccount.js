import classNames from 'classnames/bind'
import styles from './MainAccount.module.scss'
import Sidebar from '../Sidebar/Sidebar'
import Dashboard from '../Dashboard/Dashboard'
import HeaderOnly from '../HeaderOnly/HeaderOnly'

const cx = classNames.bind(styles)

function MainAccount({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderOnly />
            <div className={cx('container')}>
                <Sidebar />
                <Dashboard>{children}</Dashboard>
            </div>
        </div>
    )
}

export default MainAccount
