import classNames from 'classnames/bind'
import styles from './MyCourse.module.scss'
import MainAccount from '../../../layouts/MainAccount/MainAccount'
import { useContext, useEffect, useState } from 'react'
import Button from '../../../components/Button/Button'
import { Link } from 'react-router-dom'
import { routes } from '../../../routes/route'
import { getUserCourses } from '../../../api/userApi'
import AuthContext from '../../../context/AuthContext'

const cx = classNames.bind(styles)

function MyCourse() {
    const { user } = useContext(AuthContext)
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await getUserCourses(user._id)
                setCourses(response)
            } catch (error) {
                console.log('Error:', error)
            }
        }
        getCourses()
    }, [user._id])
    return (
        <div className={cx('wrapper')}>
            <MainAccount title="Các khoá học của tôi">
                <div className={cx('course-list')}>
                    {courses.length !== 0 ? (
                        courses.map((item, index) => (
                            <div key={index} className={cx('course-item')}>
                                <div className={cx('course-info')}>
                                    <img src={item.courseId.thumbnail} alt={item.courseId.title} />
                                    <div className={cx('info')}>
                                        <h2>{item.courseId.title}</h2>
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
