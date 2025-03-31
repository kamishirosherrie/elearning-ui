import axiosInstance from './axiosInstance'
import { apiUrl } from './apiConfig'

export const addNewSubmit = async (data) => {
    try {
        const response = await axiosInstance.post(apiUrl.submissionUrl.addNewSubmission, data)
        return response.data
    } catch (error) {
        console.log('Add new submit failed: ', error)
        throw error
    }
}
