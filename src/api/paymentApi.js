import { apiUrl } from './apiConfig'
import axiosInstance from './axiosInstance'

export const creatPayment = async (orderInfo) => {
    try {
        const response = await axiosInstance.post(apiUrl.paymentUrl.create, orderInfo)
        return response.data
    } catch (error) {
        console.log('Create payment failed', error)
        throw error
    }
}

export const getPaymentResult = async (queryParams) => {
    try {
        const response = await axiosInstance.post(apiUrl.paymentUrl.return, { params: queryParams })
        return response.data
    } catch (error) {
        console.log('Get payment result failed', error)
        throw error
    }
}
