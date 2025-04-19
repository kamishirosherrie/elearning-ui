import { apiUrl } from './apiConfig'
import axiosInstance from './axiosInstance'

export const getAllTestSets = async () => {
    try {
        const response = await axiosInstance.get(apiUrl.testSetUrl.getAllTestSet)
        return response.data.result
    } catch (error) {
        console.log('Get all test sets failed')
        throw error
    }
}
