import React, { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './PaymentStatus.module.scss'
import { getPaymentResult } from '../../api/paymentApi'

const cx = classNames.bind(styles)

const PaymentStatus = () => {
    const location = useLocation()
    const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search])

    const responseCode = queryParams.get('vnp_ResponseCode')
    const orderId = queryParams.get('vnp_TxnRef')
    const amount = queryParams.get('vnp_Amount')
    const transactionNo = queryParams.get('vnp_TransactionNo')
    const orderInfo = queryParams.get('vnp_OrderInfo')
    const bankCode = queryParams.get('vnp_BankCode')
    const payDate = queryParams.get('vnp_PayDate')
    const transactionStatus = queryParams.get('vnp_TransactionStatus')

    const isSuccess = responseCode === '00' && transactionStatus === '00'

    useEffect(() => {
        const processePayment = async () => {
            await getPaymentResult(queryParams)
        }

        processePayment()
    }, [queryParams])

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
