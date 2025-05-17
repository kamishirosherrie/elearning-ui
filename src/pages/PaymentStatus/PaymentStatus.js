import React, { useContext, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './PaymentStatus.module.scss'
import { getPaymentResult } from '../../api/paymentApi'
import { addCourseEnrollment } from '../../api/courseApi'
import AuthContext from '../../context/AuthContext'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)

const PaymentStatus = ({ courseId }) => {
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

    const isSuccess = responseCode === '00' && transactionStatus === '00'

    useEffect(() => {
        const fetchPaymentResult = async () => {
            try {
                const result = await getPaymentResult(urlParams)
                console.log('Payment result:', result)
            } catch (error) {
                console.error('Error fetching payment result:', error)
            }
        }

        fetchPaymentResult()
    }, [urlParams])

    return (
        <div className={cx('payment-status')}>
            {isSuccess ? (
                <div className={cx('success')}>
                    <h1>Thanh toán thành công 🎉</h1>
                    <p>Mã đơn hàng: {orderId}</p>
                    <p>Số tiền: {(amount / 100).toLocaleString()} VND</p>
                    <p>Ngân hàng: {bankCode}</p>
                    <p>Ngày thanh toán: {payDate}</p>
                    <p>Nội dung thanh toán: {decodeURIComponent(orderInfo)}</p>
                    <p>Mã giao dịch: {transactionNo}</p>
                    <p>Cảm ơn bạn đã thanh toán!</p>
                </div>
            ) : (
                <div className={cx('failed')}>
                    <h1>Thanh toán thất bại ❌</h1>
                    <p>Mã đơn hàng: {orderId}</p>
                    <p>Vui lòng thử lại sau hoặc liên hệ hỗ trợ.</p>
                </div>
            )}
        </div>
    )
}

export default PaymentStatus
