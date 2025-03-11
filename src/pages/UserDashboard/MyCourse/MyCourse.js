import classNames from 'classnames/bind'
import styles from './MyCourse.module.scss'
import MainAccount from '../../../layouts/MainAccount/MainAccount'
import { useState } from 'react'

const cx = classNames.bind(styles)

function MyCourse() {
    const [course, setCourse] = useState([])
    return (
        <div className={cx('wrapper')}>
            <MainAccount>
                <h1>Các khoá học của tôi</h1>
                <div className={cx('course-list')}>
                    {course.length !== 0 ? (
                        course.map((item, index) => (
                            <div key={index} className={cx('course-item')}>
                                <div className={cx('course-info')}>
                                    <img src={item.thumbnail} alt={item.title} />
                                    <div className={cx('info')}>
                                        <h2>{item.title}</h2>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                                <div className={cx('course-action')}>
                                    <button className={cx('btn')}>Xem khoá học</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <span>Bạn chưa tham gia khoá học nào</span>
                    )}
                </div>
            </MainAccount>
        </div>
    )
}

export default MyCourse
