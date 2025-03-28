import classNames from 'classnames/bind'
import styles from './MyCourse.module.scss'
import MainAccount from '../../../layouts/MainAccount/MainAccount'
import { useState } from 'react'
import Button from '../../../components/Button/Button'
import { Link } from 'react-router-dom'
import { routes } from '../../../routes/route'

const cx = classNames.bind(styles)

function MyCourse() {
    const [course, setCourse] = useState([])
    return (
        <div className={cx('wrapper')}>
            <MainAccount title="Các khoá học của tôi">
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
                        <div className={cx('no-course')}>
                            <span>Bạn chưa tham gia khoá học nào</span>
                            <Link to={routes.course}>
                                <Button normal>Nhấn vào đây để bắt đầu học</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </MainAccount>
        </div>
    )
}

export default MyCourse
