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
                    <div className={cx('description')}>
                        <span>Điều kiện & điều khoản</span>
                    </div>
                    <div className={cx('description')}>
                        <span>Chính sách bảo mật</span>
                    </div>
                    <div className={cx('description')}>
                        <span>Chính sách thanh toán</span>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('title')}>Chương trình học</div>
                    <div className={cx('description')}>
                        <span>TOEIC Listening & Reading</span>
                    </div>
                    <div className={cx('description')}>
                        <span>TOEIC Speaking & Writing</span>
                    </div>
                    <div className={cx('description')}>
                        <span>TOEIC 4 Kĩ Năng</span>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('title')}>Tính năng nổi bật</div>
                    <div className={cx('description')}>
                        <span>Luyện đề TOEIC 4 kĩ năng</span>
                    </div>
                    <div className={cx('description')}>
                        <span>Phòng luyện viết với AI</span>
                    </div>
                    <div className={cx('description')}>
                        <span>Phòng luyện nói với AI</span>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('title')}>Kết nối với chúng tôi</div>
                    <div className={cx('description')}>
                        <span>Số điện thoại</span>
                    </div>
                    <div className={cx('description')}>
                        <span>Facebook</span>
                    </div>
                    <div className={cx('description')}>
                        <span>Instagram</span>
                    </div>
                    <div className={cx('description')}>
                        <span>Email</span>
                    </div>
                </div>
            </div>
            <div className={cx('copy-right')}>
                <p>© 2025 Công ty TNHH ...</p>
            </div>
        </div>
    )
}

export default Footer
