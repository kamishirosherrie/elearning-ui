import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Course.module.scss'

import MainLayout from '../../layouts/MainLayout/MainLayout'
import { useEffect, useState } from 'react'
import { getCourse } from '../../api/courseApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { useLoading } from '../../context/LoadingContext'

const cx = classNames.bind(styles)

function Course() {
    const { setIsLoading } = useLoading()
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const getCourses = async () => {
            try {
                setIsLoading(true)
                const response = await getCourse()
                setCourses(response.courses)
            } catch (error) {
                console.log('Error:', error)
            } finally {
                setIsLoading(false)
            }
        }
        getCourses()
    }, [setIsLoading])
    return (
        <MainLayout>
            <div className={cx('wrapper')}>
                <h1 className={cx('title')}>Danh sách khóa học</h1>
                <div className={cx('course-list')}>
                    {courses.map((item, index) => (
                        <div className={cx('course-item')} key={index}>
                            <span className={cx('course-title')}>{item.title}</span>
                            <span className={cx('course-description')}>{item.shortDescription}</span>
                            <Link to={`/course/${item.slug}`} className={cx('course-link')}>
                                <FontAwesomeIcon className={cx('course-icon')} icon={faArrowDown} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}

export default Course
