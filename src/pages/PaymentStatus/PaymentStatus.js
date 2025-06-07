import { useContext, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './PaymentStatus.module.scss'
import { getPaymentResult } from '../../api/paymentApi'
import AuthContext from '../../context/AuthContext'
import { routes } from '../../routes/route'
import { addCourseEnrollment } from '../../api/courseApi'
import MainLayout from '../../layouts/MainLayout/MainLayout'

const cx = classNames.bind(styles)

const PaymentStatus = () => {
    const location = useLocation()
    const { user } = useContext(AuthContext)
    const queryParams = useMemo(() => {
        const params = new URLSearchParams(location.search)
        return Object.fromEntries(params.entries())
    }, [location.search])

    const responseCode = queryParams['vnp_ResponseCode']
    const orderId = queryParams['vnp_TxnRef']
    const amount = queryParams['vnp_Amount']
    const transactionNo = queryParams['vnp_TransactionNo']
    const orderInfo = queryParams['vnp_OrderInfo']
    const bankCode = queryParams['vnp_BankCode']
    const payDate = queryParams['vnp_PayDate']
    const transactionStatus = queryParams['vnp_TransactionStatus']

    const isSuccess = responseCode === '00' && transactionStatus === '00'

    useEffect(() => {
        const processePayment = async () => {
            try {
                const response = await getPaymentResult(location.search)
                console.log('Payment result:', response)

                if (response.status === 200) {
                    try {
                        await addCourseEnrollment({
                            courseId: response.courseId,
                            userId: user._id,
                        })
                    } catch (error) {
                        console.error('Error enrolling in course:', error)
                    }
                }
            } catch (error) {
                console.error('Error processing payment:', error)
            }
        }

        processePayment()
    }, [location.search, user._id])

    return (
        <MainLayout>
            <div className={cx('payment-status')}>
                {isSuccess ? (
                    <div className={cx('success')}>
                        <h1>Thanh toán thành công ✅</h1>
                        <p>Mã đơn hàng: {orderId}</p>
                        <p>Tổng tiền: {(amount / 100).toLocaleString()} VND</p>
                        <p>Tên khách hàng: {user?.fullName}</p>
                        <p>Số điện thoại: {user?.phoneNumber}</p>
                        <p>Ngân hàng: {bankCode}</p>
                        <p>
                            Phương thức thanh toán: Thanh toán online qua VNPAY (QR, Thẻ ATM nội địa hoặc Thẻ Quốc tế)
                        </p>
                        <p>Ngày thanh toán: {payDate}</p>
                        <p>Nội dung thanh toán: {decodeURIComponent(orderInfo)}</p>
                        <p>Mã giao dịch: {transactionNo}</p>
                        <p>Cảm ơn bạn đã thanh toán!</p>
                        <p>
                            Bạn có thể truy cập vào khóa học <a href={routes.myCourse}>tại đây</a>
                        </p>
                    </div>
                ) : (
                    <div className={cx('failed')}>
                        <h1>Thanh toán thất bại ❌</h1>
                        <p>Mã đơn hàng: {orderId}</p>
                        <p>
                            Vui lòng thử lại sau hoặc liên hệ hỗ trợ qua email: <strong>support@emaster.com</strong>.
                        </p>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

export default PaymentStatus
