import classNames from 'classnames/bind'
import styles from './CourseDetail.module.scss'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCourseBySlug } from '../../api/courseApi'
import ListLesson from '../../components/ListLesson/ListLesson'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import Button from '../../components/Button/Button'

const cx = classNames.bind(styles)

function CourseDetail() {
    const slug = useParams().courseName
    const [course, setCourse] = useState({})
    const [active, setActive] = useState(false)

    const handleClickChapter = () => {
        setActive((prev) => !prev)
    }

    useEffect(() => {
        const getCourseInfo = async () => {
            const response = await getCourseBySlug(slug)
            setCourse(response)
        }
        console.log(slug)

        getCourseInfo()
    }, [slug])

    return (
        <MainLayout>
            <div className={cx('wrapper')}>
                <div className={cx('column')}>
                    <h1 className={cx('title')}>{course?.title}</h1>
                    <span>{course?.description}</span>
                    <div className={cx('intro')}>
                        <div className={cx('intro-item')}>
                            <p>Giới thiệu khóa học</p>
                            <span>
                                Bạn đang tìm kiếm một khóa học tiếng Anh toàn diện giúp nâng cao cả 4 kỹ năng: Đọc,
                                Nghe, Viết, Nói? Khóa học của chúng tôi được thiết kế dành riêng cho người học ở mọi
                                trình độ, từ cơ bản đến nâng cao. Với phương pháp học tập hiện đại và giáo trình bài
                                bản, bạn sẽ tự tin sử dụng tiếng Anh trong mọi tình huống.
                            </span>
                        </div>
                        <div className={cx('intro-item')}>
                            <p>Lợi ích khi tham gia khóa học</p>
                            <span>Phát triển các kĩ năng Đọc - Nghe</span>
                            <span>Học tập, tương tác linh hoạt</span>
                            <span>Lộ Trình Cá Nhân Hóa</span>
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <p>Nội dung khóa học</p>
                        <div className={cx('content-info')}>
                            <span>4 chương</span>
                            <span>-</span>
                            <span>12 bài học</span>
                        </div>
                    </div>
                    <div className={cx('chapter')}>
                        <div className={cx('chapter-title', { active })} onClick={handleClickChapter}>
                            Chương 1
                            <div className={cx('collapsible')}>
                                <ListLesson slug={slug} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('column')}>
                    <span className={cx('price')}>1.200.000đ</span>
                    <Button blue>Đăng ký học</Button>
                    <span>Học mọi lúc, mọi nơi</span>
                </div>
            </div>
        </MainLayout>
    )
}

export default CourseDetail
