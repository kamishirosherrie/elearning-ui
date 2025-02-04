import classNames from 'classnames/bind'

import { image } from '../../assets/images/image'
import styles from './HeaderOnly.module.scss'
import { ArrowDown } from '../../components/Icons/Icon'

const cx = classNames.bind(styles)

function HeaderOnly() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <div className={cx('menu')}>
                    <a className={cx('logo')} href="/">
                        <img width="100px" src={image.logo} alt="logo" />
                    </a>
                    <ul className={cx('menu-list')}>
                        <li>Trang chủ</li>
                        <li>
                            Khóa học
                            <ArrowDown className={cx('icon')} />
                            <div className={cx('dropdown')}>
                                <a className={cx('course')} href="/ielts">
                                    IELTS
                                </a>
                                <a className={cx('course')} href="/toeic">
                                    TOEIC LISTENING & READING
                                </a>
                                <a className={cx('course')} href="/">
                                    TOEIC SPEAKING & WRITING
                                </a>
                                <a className={cx('course')} href="/">
                                    TOEIC 4 KỸ NĂNG
                                </a>
                            </div>
                        </li>
                        <li>
                            Kiểm tra đầu vào
                            <ArrowDown className={cx('icon')} />
                            <div className={cx('dropdown')}>
                                <a className={cx('course')} href="/">
                                    IELTS
                                </a>
                                <a className={cx('course')} href="/">
                                    TOEIC
                                </a>
                            </div>
                        </li>
                        <li>
                            Luyện đề
                            <ArrowDown className={cx('icon')} />
                            <div className={cx('dropdown')}>
                                <a className={cx('course')} href="/">
                                    Luyện đề IELTS
                                </a>
                                <a className={cx('course')} href="/">
                                    Luyện đề TOEIC
                                </a>
                            </div>
                        </li>
                        <li>
                            Blog
                            <ArrowDown className={cx('icon')} />
                            <div className={cx('dropdown')}>
                                <a className={cx('course')} href="/">
                                    IELTS
                                </a>
                                <a className={cx('course')} href="/">
                                    TOEIC LISTENING & READING
                                </a>
                                <a className={cx('course')} href="/">
                                    TOEIC SPEAKING & WRITING
                                </a>
                                <a className={cx('course')} href="/">
                                    TOEIC 4 KỸ NĂNG
                                </a>
                            </div>
                        </li>
                        <li>
                            Tin tức
                            <ArrowDown className={cx('icon')} />
                            <div className={cx('dropdown')}>
                                <a className={cx('course')} href="/">
                                    IELTS
                                </a>
                                <a className={cx('course')} href="/">
                                    TOEIC LISTENING & READING
                                </a>
                                <a className={cx('course')} href="/">
                                    TOEIC SPEAKING & WRITING
                                </a>
                                <a className={cx('course')} href="/">
                                    TOEIC 4 KỸ NĂNG
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={cx('button')}>
                    <button className={cx('start-now')}>Học ngay</button>
                </div>
            </div>
        </div>
    )
}

export default HeaderOnly
