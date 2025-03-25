import classNames from 'classnames/bind'
import styles from './HeaderOnly.module.scss'

import { image } from '../../assets/images/image'
import { ArrowDown } from '../../components/Icons/Icon'

const cx = classNames.bind(styles)

function HeaderOnly() {
    const courseLink = '/'
    const courseLinkTest = '/'
    const courseLinkPractice = '/'
    const courseLinkGuarantee = '/'

    const handleOnCourseClick = () => {
        const dropdown = document.querySelector(`.${cx('dropdown')}`)
        dropdown.classList.toggle(`${cx('show')}`)
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <div className={cx('menu')}>
                    <a className={cx('logo')} href="/">
                        <img width="100px" src={image.logo} alt="logo" />
                    </a>
                    <ul className={cx('menu-list')}>
                        <li onClick={handleOnCourseClick}>
                            Khóa học
                            <ArrowDown className={cx('icon')} />
                            <div className={cx('dropdown')}>
                                <a className={cx('course')} href="/ielts">
                                    IELTS
                                </a>
                                <a className={cx('course')} href="/toeic">
                                    TOEIC LISTENING & READING
                                </a>
                                <a className={cx('course')} href="/toeic">
                                    TOEIC SPEAKING & WRITING
                                </a>
                                <a className={cx('course')} href="/toeic">
                                    TOEIC 4 KỸ NĂNG
                                </a>
                            </div>
                        </li>
                        <div className={cx('group')}>
                            <li className={cx('active')}>
                                <a href={courseLink}> Xây dựng lộ trình</a>
                            </li>
                            <li>
                                <a href={courseLinkTest}>Kiểm tra đầu vào</a>
                            </li>
                            <li>
                                <a href={courseLinkPractice}>Luyện đề</a>
                            </li>
                            <li>
                                <a href={courseLinkGuarantee}>Cam kết đầu ra</a>
                            </li>
                        </div>
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
