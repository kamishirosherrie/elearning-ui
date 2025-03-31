import classNames from 'classnames/bind'
import styles from './Checkout.module.scss'
import { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import Button from '../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { addCourseEnrollment } from '../../api/courseApi'
import { ChevronRight } from '../Icons/Icon'

const cx = classNames.bind(styles)

function Checkout({ course }) {
    const { user } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen((prev) => !prev)
    }

    const handleBack = () => {
        setIsOpen((prev) => !prev)
    }

    const handleSubmit = async () => {
        try {
            const response = await addCourseEnrollment({ courseId: course._id, userId: user._id })
            console.log(response)
            alert('Đăng ký thành công!')
        } catch (error) {
            alert(error.response.data.message)
            console.log('Subcreibe course failed: ', error.response.data.message)
        }
    }
    return (
        <div className={cx('wrapper')}>
            {!isOpen ? (
                <div className={cx('container')}>
                    <div className={cx('column')}>
                        <div className={cx('content', 'title')}>
                            Sản phẩm:
                            <span>{course.title}</span>
                        </div>
                        <div className={cx('content', 'price')}>
                            Tổng giá bán:
                            <span>1.200.000VNĐ</span>
                        </div>
                        <div className={cx('content')}>
                            Khuyến mãi:
                            <div className={cx('discount')}>
                                <input type="text" placeholder="Nhập mã coupon" />
                                <ChevronRight className={cx('icon')} />
                            </div>
                            <div className={cx('discount-value')}>
                                Giảm giá (Giảm 10% cho học sinh đăng ký lần đầu):
                                <span>-100.000VNĐ</span>
                            </div>
                        </div>
                        <div className={cx('content', 'total')}>
                            Tổng cộng:
                            <span>1.200.000VNĐ</span>
                        </div>
                    </div>
                    <div className={cx('column')}>
                        <p className={cx('content', 'title')}>Thông tin của bạn</p>

                        <label htmlFor="phoneNumber" className={cx('content')}>
                            Số điện thoại
                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            className={cx('content')}
                            value={user?.phoneNumber}
                            readOnly
                        />

                        <label htmlFor="email" className={cx('content')}>
                            Email
                        </label>
                        <input type="text" name="email" className={cx('content')} value={user?.email} readOnly />

                        <Button blue onClick={handleClick} className={cx('content', 'btn-submit')}>
                            Tiếp tục thanh toán
                        </Button>
                    </div>
                </div>
            ) : (
                <div className={cx('container')}>
                    <div className={cx('next-step')}>
                        <Button blue onClick={handleBack}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Button>
                        <div className={cx('content')}>
                            Step 2
                            <Button blue onClick={handleSubmit} className={cx('btn-submit')}>
                                Đăng ký
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Checkout
