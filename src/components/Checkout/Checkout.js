import classNames from 'classnames/bind'
import styles from './Checkout.module.scss'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import Button from '../Button/Button'
import { ChevronRight } from '../Icons/Icon'
import { useLoading } from '../../context/LoadingContext'
import { toast } from 'react-toastify'
import { creatPayment } from '../../api/paymentApi'

const cx = classNames.bind(styles)

function Checkout({ course, setClose }) {
    const { user } = useContext(AuthContext)
    const { setIsLoading } = useLoading()

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const response = await creatPayment({
                amount: course.price,
                orderInfo: `Thanh toan khoa hoc ${course.title}`,
                courseId: course._id,
            })

            if (response.url) {
                window.location.href = response.url
            } else toast.error('Thanh toán thất bại')
            setClose(false)
        } catch (error) {
            toast.error(error.response?.data?.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('column')}>
                    <div className={cx('content', 'title')}>
                        Sản phẩm:
                        <span>{course.title}</span>
                    </div>
                    <div className={cx('content', 'price')}>
                        Tổng giá bán:
                        <span>{course.price.toLocaleString()} VND</span>
                    </div>
                    <div className={cx('content')}>
                        Khuyến mãi:
                        <div className={cx('discount')}>
                            <input type="text" placeholder="Nhập mã coupon" />
                            <ChevronRight className={cx('icon')} />
                        </div>
                        <div className={cx('discount-value')}>
                            Giảm giá:
                            <span>0 VND</span>
                        </div>
                    </div>
                    <div className={cx('content', 'total')}>
                        Tổng cộng:
                        <span>{course.price.toLocaleString()} VND</span>
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

                    <Button blue onClick={handleSubmit} className={cx('content', 'btn-submit')}>
                        Thanh toán
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Checkout
