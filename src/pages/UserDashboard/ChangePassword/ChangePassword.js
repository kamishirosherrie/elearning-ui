import classNames from 'classnames/bind'
import styles from './ChangePassword.module.scss'
import MainAccount from '../../../layouts/MainAccount/MainAccount'
import Button from '../../../components/Button/Button'
import { useContext, useState } from 'react'
import AuthContext from '../../../context/AuthContext'
import { changePassWord } from '../../../api/authApi'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)

function ChangePassword() {
    const { user } = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState({
        currentPassWord: '',
        newPassWord: '',
        confirmPassWord: '',
        userId: user._id,
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInfo((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        try {
            if (userInfo.newPassWord !== userInfo.confirmPassWord) {
                toast.error('Mật khẩu mới không khớp!')
                return
            }
            await changePassWord(userInfo)
            toast.success('Đổi mật khẩu thành công!')

            setUserInfo({
                currentPassWord: '',
                newPassWord: '',
                confirmPassWord: '',
                userId: user._id,
            })
        } catch (error) {
            if (error && error.status === 400) {
                toast.error('Mật khẩu cũ không đúng!')
            } else {
                console.log(error.status)
                toast.error(error.response?.data?.message || 'Đổi mật khẩu thất bại!')
            }
        }
    }

    return (
        <div className={cx('wrapper')}>
            <MainAccount title="Đổi mật khẩu">
                <div className={cx('form')}>
                    <div className={cx('form-group')}>
                        <label className={cx('label')}>Mật khẩu cũ:</label>
                        <input
                            className={cx('input')}
                            name="currentPassWord"
                            type="password"
                            required
                            value={userInfo.currentPassWord || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('label')}>Mật khẩu mới:</label>
                        <input
                            className={cx('input')}
                            name="newPassWord"
                            type="password"
                            required
                            value={userInfo.newPassWord || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('label')}>Nhập lại mật khẩu mới:</label>
                        <input
                            className={cx('input')}
                            name="confirmPassWord"
                            type="password"
                            required
                            value={userInfo.confirmPassWord || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <Button blue className={cx('btn-save')} onClick={handleSubmit}>
                        Cập nhật
                    </Button>
                </div>
            </MainAccount>
        </div>
    )
}

export default ChangePassword
