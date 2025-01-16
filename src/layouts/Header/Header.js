import classNames from 'classnames/bind'

import { image } from '../../assets/images/image'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <div className={cx('menu')}>
                    <div className={cx('logo')}>
                        <img src={image.logo} alt="logo" />
                    </div>
                    <ul className={cx('menu-list')}>
                        <li>
                            <a href="#course">Trang chủ</a>
                        </li>
                        <li>
                            <a href="#course">Khóa học</a>
                        </li>
                        <li>
                            <a href="#course">Kiểm tra đầu vào</a>
                        </li>
                        <li>
                            <a href="#course">Luyện đề</a>
                        </li>
                        <li>
                            <a href="#course">Blog</a>
                        </li>
                        <li>
                            <a href="#course">Tin tức</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <button className={cx('start-now')}>Học ngay</button>
                </div>
            </div>
        </div>
    )
}

export default Header
