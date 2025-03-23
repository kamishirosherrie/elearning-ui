import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Home.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons/faCircleArrowDown'

import HeaderOnly from '../../layouts/HeaderOnly/HeaderOnly'
import { getCourse } from '../../api/courseApi'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function Home() {
    const [courses, setCourse] = useState([])

    useEffect(() => {
        const getAllCourse = async () => {
            const response = await getCourse()
            setCourse(response.courses)
        }

        getAllCourse()
    }, [])
    return (
        <div className={cx('wrapper')}>
            <HeaderOnly />
            <div className={cx('course')} id="course">
                <h1 className={cx('sub-title')}>
                    Tinh thông mọi ngôn ngữ <br /> với bộ chương trình đào tạo <br /> chất lượng cao
                </h1>
                <div className={cx('course-list')}>
                    {courses.map((item, index) => (
                        <div className={cx('course-item')}>
                            <span className={cx('course-title')}>{item.title}</span>
                            <span className={cx('course-description')}>{item.description}</span>
                            <Link to={`/course/${item.slug}`} className={cx('course-button')}>
                                <FontAwesomeIcon className={cx('course-icon')} icon={faCircleArrowDown} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
