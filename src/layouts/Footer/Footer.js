import classNames from 'classnames/bind'
import styles from './Footer.module.scss'
import { image } from '../../assets/images/image'
import { Link } from 'react-router-dom'
import { routes } from '../../routes/route'

const cx = classNames.bind(styles)

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('logo')}>
                        <img src={image.logoWhite} alt="logo-text" />
                    </div>
                    <div className={cx('description')}>
                        <p>Công ty TNHH EMaster</p>
                        <p>Địa chỉ liên hệ: Tầng 6, Số 3 đường Cầu Giấy, Quận Đống Đa, Thành phố Hà Nội, Việt Nam</p>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('title')}>Về chúng tôi</div>
                    <div className={cx('description')}>
                        <Link to={routes.aboutUs}>Giới thiệu</Link>
                    </div>
                    <div className={cx('description')}>
                        <Link to={routes.termAndCondition}>Điều kiện & điều khoản</Link>
                    </div>
                    <div className={cx('description')}>
                        <Link to={routes.privacyPolicy}>Chính sách bảo mật</Link>
                    </div>
                    <div className={cx('description')}>
                        <Link to={routes.paymentPolicy}>Chính sách thanh toán</Link>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('title')}>Chương trình học</div>
                    <div className={cx('description')}>
                        <Link to={`${routes.course}/toeic-listening-and-reading`}>TOEIC Listening & Reading</Link>
                    </div>
                    <div className={cx('description')}>
                        <Link to={`${routes.course}/toeic-speaking-and-writing`}>TOEIC Speaking & Writing</Link>
                    </div>
                    <div className={cx('description')}>
                        <Link to={`${routes.course}/toeic-full-skills`}>TOEIC 4 Kĩ Năng</Link>
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
                        <a href="tel:+84346715041">Số điện thoại: +84 346 715 041</a>
                    </div>
                    <div className={cx('description')}>
                        <a href="https://facebook.com/duonghang591">Facebook</a>
                    </div>
                    <div className={cx('description')}>
                        <a href="https://instagram.com">Instagram</a>
                    </div>
                    <div className={cx('description')}>
                        <a href="mailto:support@emaster.com">Email: support@emaster.com</a>
                    </div>
                </div>
            </div>
            <div className={cx('copy-right')}>
                <p>© 2025 EMaster</p>
            </div>
        </div>
    )
}

export default Footer
