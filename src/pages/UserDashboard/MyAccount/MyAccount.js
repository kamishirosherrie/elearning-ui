import { useContext } from 'react'
import AuthContext from '../../../context/AuthContext'
import classNames from 'classnames/bind'
import styles from './MyAccount.module.scss'

import MainAccount from '../../../layouts/MainAccount/MainAccount'
import Button from '../../../components/Button/Button'

const cx = classNames.bind(styles)

function MyAccount() {
    const { user } = useContext(AuthContext)

    const formatDate = (isoDate) => {
        if (!isoDate) return ''
        const date = new Date(isoDate)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${day}/${month}/${year}`
    }

    const handleChange = () => {}

    return (
        <div className={cx('wrapper')}>
            <MainAccount title="Thông tin cá nhân">
                <div className={cx('column')}>
                    <div className={cx('info')}>
                        <div className={cx('info-item')}>
                            <label className={cx('label')}>Họ và tên</label>
                            <input className={cx('value')} value={user?.fullName} onChange={handleChange} />
                        </div>
                        <div className={cx('info-item')}>
                            <label className={cx('label')}>Username</label>
                            <input className={cx('value')} value={user?.userName} readOnly />
                        </div>
                        <div className={cx('info-item')}>
                            <label className={cx('label')}>Email</label>
                            <input className={cx('value')} value={user?.email} readOnly />
                        </div>
                        <div className={cx('info-item')}>
                            <label className={cx('label')}>Số điện thoại</label>
                            <input className={cx('value')} value={user?.phoneNumber} onChange={handleChange} />
                        </div>
                        <div className={cx('info-item')}>
                            <label className={cx('label')}>Ngày sinh</label>
                            <input
                                className={cx('value')}
                                type="text"
                                value={formatDate(user?.birthday)}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={cx('btn-save')}>
                            <Button blue fullWidth>
                                Lưu
                            </Button>
                        </div>
                    </div>
                    {/* <div className={cx('info')}>
                        <div className={cx('info-item')}>
                            <label className={cx('label')}>Tỉnh/Thành phố</label>
                            <input className={cx('value')} value={user?.city} onChange={handleChange} />
                        </div>
                        <div className={cx('info-item')}>
                            <label className={cx('label')}>Quận/Huyện</label>
                            <input className={cx('value')} value={user?.district} onChange={handleChange} />
                        </div>
                        <div className={cx('info-item')}>
                            <label className={cx('label')}>Phường/Xã</label>
                            <input className={cx('value')} value={user?.ward} onChange={handleChange} />
                        </div>
                    </div> */}
                </div>
            </MainAccount>
        </div>
    )
}

export default MyAccount
