import { useContext, useState } from 'react'
import AuthContext from '../../../context/AuthContext'
import classNames from 'classnames/bind'
import styles from './MyAccount.module.scss'

import MainAccount from '../../../layouts/MainAccount/MainAccount'
import Button from '../../../components/Button/Button'
import { updateUserProfile } from '../../../api/userApi'
import { toast } from 'react-toastify'
import { useLoading } from '../../../context/LoadingContext'

const cx = classNames.bind(styles)

const formatDate = (isoDate) => {
    if (!isoDate) return ''
    const date = new Date(isoDate)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
}

function MyAccount() {
    const { user, login } = useContext(AuthContext)
    const { setIsLoading } = useLoading()

    const userRank = user.rank || 'unrank'

    const [userInfo, setUserInfo] = useState({
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        birthday: formatDate(user.birthday),
        isSubcribedEmail: user.isSubcribedEmail ?? false,
        rank: userRank,
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setUserInfo((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            await updateUserProfile(userInfo)
            toast.success('Cập nhật thông tin thành công!')
            login(userInfo)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Cập nhật thông tin thất bại!')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <MainAccount title="Thông tin cá nhân">
                <div className={cx('column')}>
                    <div className={cx('info')}>
                        <div className={cx('info-item')}>
                            <label className={cx('label')}>Họ và tên</label>
                            <input
                                name="fullName"
                                className={cx('value')}
                                value={userInfo?.fullName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={cx('info-item')}>
                            <label className={cx('label')}>Username</label>
                            <input className={cx('value')} value={userInfo?.userName} readOnly />
                        </div>
                        <div className={cx('info-item')}>
                            <label className={cx('label')}>Email</label>
                            <input className={cx('value')} value={userInfo?.email} readOnly />
                        </div>
                        <div className={cx('info-item')}>
                            <label className={cx('label')}>Số điện thoại</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                className={cx('value')}
                                value={userInfo?.phoneNumber || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={cx('info-item')}>
                            <label className={cx('label')}>Ngày sinh</label>
                            <input
                                className={cx('value')}
                                type="date"
                                name="birthday"
                                value={userInfo?.birthday || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={cx('info-item')}>
                            <span>
                                Tôi đồng ý nhận thông tin từ EMaster qua Email, bao gồm thông báo về các khóa học, tin
                                tức và sự kiện mới nhất.
                            </span>
                            <input
                                id="isSubcribedEmail"
                                type="checkbox"
                                name="isSubcribedEmail"
                                checked={userInfo.isSubcribedEmail}
                                onChange={handleChange}
                                style={{ width: 0, height: 0, position: 'absolute', left: '-9999px' }}
                            />
                            <label className={cx('label', 'newsletter')} htmlFor="isSubcribedEmail">
                                <span>Nhận thông báo qua email</span>
                            </label>
                        </div>
                        <div className={cx('btn-save')}>
                            <Button blue fullWidth onClick={handleSubmit}>
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
