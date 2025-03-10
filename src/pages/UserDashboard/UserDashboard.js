import classNames from 'classnames/bind'
import styles from './UserDashboard.module.scss'
import Dashboard from '../../components/Dashboard/Dashboard'
import Header from '../../layouts/Header/Header'

const cx = classNames.bind(styles)

function UserDashboard() {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <Dashboard />
        </div>
    )
}

export default UserDashboard
