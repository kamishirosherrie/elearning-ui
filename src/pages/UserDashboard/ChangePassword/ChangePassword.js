import classNames from 'classnames/bind'
import styles from './ChangePassword.module.scss'
import MainAccount from '../../../layouts/MainAccount/MainAccount'

const cx = classNames.bind(styles)

function ChangePassword() {
    return (
        <div className={cx('wrapper')}>
            <MainAccount>
                <div className={cx('change-password')}>
                    <h1 className={cx('title')}>Đổi mật khẩu</h1>
                    <div className={cx('form')}>
                        <div className={cx('form-group')}>
                            <label className={cx('label')}>Mật khẩu cũ:</label>
                            <input className={cx('input')} type="password" />
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('label')}>Mật khẩu mới:</label>
                            <input className={cx('input')} type="password" />
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('label')}>Nhập lại mật khẩu mới:</label>
                            <input className={cx('input')} type="password" />
                        </div>
                        <button className={cx('btn-save')}>Lưu</button>
                    </div>
                </div>
            </MainAccount>
        </div>
    )
}

export default ChangePassword
