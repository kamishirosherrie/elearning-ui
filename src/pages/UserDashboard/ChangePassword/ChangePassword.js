import classNames from 'classnames/bind'
import styles from './ChangePassword.module.scss'
import MainAccount from '../../../layouts/MainAccount/MainAccount'

const cx = classNames.bind(styles)

function ChangePassword() {
    return (
        <div className={cx('wrapper')}>
            <MainAccount title="Đổi mật khẩu">
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
            </MainAccount>
        </div>
    )
}

export default ChangePassword
