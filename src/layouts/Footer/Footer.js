import classNames from 'classnames/bind'
import styles from './Footer.module.scss'
import { Logo } from '../../components/Icons/Icon'

const cx = classNames.bind(styles)

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('logo')}>
                        <Logo />
                    </div>
                    <div className={cx('description')}>
                        <p>Công ty TNHH ...</p>
                        <p>Địa chỉ liên hệ: Tầng 6, Số 3 đường Cầu Giấy, Quận Đống Đa, Thành phố Hà Nội, Việt Nam</p>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('title')}>Về chúng tôi</div>
                    <div className={cx('description')}>Điều kiện & điều khoản</div>
                    <div className={cx('description')}>Chính sách bảo mật</div>
                    <div className={cx('description')}>Chính sách thanh toán</div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('title')}>Chương trình học</div>
                    <div className={cx('description')}>TOEIC Listening & Reading</div>
                    <div className={cx('description')}>TOEIC Speaking & Writing</div>
                    <div className={cx('description')}>TOEIC 4 Kĩ Năng</div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('title')}>Tính năng nổi bật</div>
                    <div className={cx('description')}>Luyện đề TOEIC 4 kĩ năng</div>
                    <div className={cx('description')}>Phòng luyện viết với AI</div>
                    <div className={cx('description')}>Phòng luyện nói với AI</div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('title')}>Kết nối với chúng tôi</div>
                    <div className={cx('description')}>Số điện thoại</div>
                    <div className={cx('description')}>Facebook</div>
                    <div className={cx('description')}>Instagram</div>
                    <div className={cx('description')}>Email</div>
                </div>
            </div>
            <div className={cx('copy-right')}>
                <p>© 2025 Công ty TNHH ...</p>
            </div>
        </div>
    )
}

export default Footer
