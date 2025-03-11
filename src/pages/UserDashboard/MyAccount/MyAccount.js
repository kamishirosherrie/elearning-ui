import { useContext } from 'react'
import AuthContext from '../../../context/AuthContext'
import classNames from 'classnames/bind'
import styles from './MyAccount.module.scss'

import MainAccount from '../../../layouts/MainAccount/MainAccount'

const cx = classNames.bind(styles)

function MyAccount() {
    const { user } = useContext(AuthContext)

    const handleChange = () => {}
    return (
        <div className={cx('wrapper')}>
            <MainAccount>
                <div className={cx('user-info')}>
                    <h1 className={cx('title')}>Thông tin cá nhân</h1>
                    <div className={cx('info')}>
                        <div className={cx('info-item')}>
                            <label className={cx('label')}>Họ và tên:</label>
                            <input className={cx('value')} value={user?.fullName} onChange={handleChange} />
                        </div>
                        <div className={cx('info-item')}>
                            <label className={cx('label')}>Email:</label>
                            <input className={cx('value')} value={user?.email} onChange={handleChange} />
                        </div>
                        <div className={cx('info-item')}>
                            <label className={cx('label')}>Số điện thoại:</label>
                            <input className={cx('value')} value={user?.phoneNumber} onChange={handleChange} />
                        </div>
                        <div className={cx('info-item')}>
                            <label className={cx('label')}>Ngày sinh:</label>
                            <input className={cx('value')} value={user?.dob} onChange={handleChange} />
                        </div>
                    </div>
                    <button className={cx('btn-saver')}>Lưu</button>
                </div>
            </MainAccount>
        </div>
    )
}

export default MyAccount
