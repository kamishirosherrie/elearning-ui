import classNames from 'classnames/bind'
import styles from './MyCourse.module.scss'
import MainAccount from '../../../layouts/MainAccount/MainAccount'
import { useContext, useEffect, useState } from 'react'
import Button from '../../../components/Button/Button'
import { Link } from 'react-router-dom'
import { routes } from '../../../routes/route'
import { getUserCourses } from '../../../api/userApi'
import AuthContext from '../../../context/AuthContext'
import { useLoading } from '../../../context/LoadingContext'

const cx = classNames.bind(styles)

function MyCourse() {
    const { user } = useContext(AuthContext)
    const { setIsLoading } = useLoading()
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const getCourses = async () => {
            try {
                setIsLoading(true)
                const response = await getUserCourses(user._id)
                console.log(response)

                setCourses(response)
            } catch (error) {
                console.log('Error:', error)
            } finally {
                setIsLoading(false)
            }
        }
        getCourses()
    }, [user._id, setIsLoading])
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
                                    <Button blue href={`${routes.course}/${item.courseId.slug}`}>
                                        Xem khóa học
                                    </Button>
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
