import classNames from 'classnames/bind'
import styles from './MyAccount.module.scss'
import Header from '../../../layouts/Header/Header'
import Sidebar from '../../../layouts/Sidebar/Sidebar'
import { useContext } from 'react'
import AuthContext from '../../../context/AuthContext'
import Dashboard from '../../../components/Dashboard/Dashboard'

const cx = classNames.bind(styles)

function MyAccount() {
    const { user } = useContext(AuthContext)
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}><Sidebar />
            {/* <div className={cx('content')}> */}
                <Dashboard>
                    <span>Welcome {user.email}!</span>
                </Dashboard>
            {/* </div> */}
            </div>
        </div>
    )
}

export default MyAccount
