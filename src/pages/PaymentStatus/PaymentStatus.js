import { useContext, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './PaymentStatus.module.scss'
import { getPaymentResult } from '../../api/paymentApi'
import AuthContext from '../../context/AuthContext'
import { routes } from '../../routes/route'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import { addCourseEnrollment } from '../../api/courseApi'

const cx = classNames.bind(styles)

const PaymentStatus = () => {
    const { user } = useContext(AuthContext)
    const location = useLocation()
    const urlParams = new URLSearchParams(location.search).toString()
    const queryParams = useMemo(() => {
        const params = new URLSearchParams(location.search)
        return Object.fromEntries(params.entries())
    }, [location.search])
    console.log('queryParams: ', queryParams)
    console.log('urlParams: ', urlParams)
    const responseCode = queryParams['vnp_ResponseCode']
    const orderId = queryParams['vnp_TxnRef']
    const amount = queryParams['vnp_Amount']
    const transactionNo = queryParams['vnp_TransactionNo']
    const orderInfo = queryParams['vnp_OrderInfo']
    const bankCode = queryParams['vnp_BankCode']
    const payDate = queryParams['vnp_PayDate']
    const transactionStatus = queryParams['vnp_TransactionStatus']

    const formatPayDate = (payDateStr) => {
        if (!payDateStr || payDateStr.length < 8) return ''
        const year = payDateStr.substring(0, 4)
        const month = payDateStr.substring(4, 6)
        const day = payDateStr.substring(6, 8)
        return `${day}/${month}/${year}`
    }

    const isSuccess = responseCode === '00' && transactionStatus === '00'

    useEffect(() => {
        const fetchPaymentResult = async () => {
            try {
                const result = await getPaymentResult(urlParams)
                if (result) {
                    try {
                        const response = await addCourseEnrollment({ courseId: result.courseId, userId: user._id })
                        console.log('Enrollment response:', response)
                    } catch (error) {
                        console.error('Error adding course enrollment:', error)
                    }
                }
                console.log('Payment result:', result)
            } catch (error) {
                console.error('Error fetching payment result:', error)
            }
        }

        fetchPaymentResult()
    }, [urlParams, user._id])

    return (
        <MainLayout>
            <div className={cx('payment-status')}>
                {isSuccess ? (
                    <div className={cx('success')}>
                        <h1>Thanh toán thành công ✅</h1>
                        <p>Mã đơn hàng: {orderId}</p>
                        <p>Tổng tiền: {(amount / 100).toLocaleString()} VND</p>
                        <p>Tên khách hàng: {user?.fullName}</p>
                        {user?.email && <p>Email: {user.email}</p>}
                        {user?.phoneNumber && <p>Số điện thoại: {user.phoneNumber}</p>}
                        <p>Ngân hàng: {bankCode}</p>
                        <p>
                            Phương thức thanh toán: Thanh toán online qua VNPAY (QR, Thẻ ATM nội địa hoặc Thẻ Quốc tế)
                        </p>
                        <p>Ngày thanh toán: {formatPayDate(payDate)}</p>
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
