import axiosInstance from './axiosInstance'
import { apiUrl } from './apiConfig'

export const getQuestionType = async () => {
    try {
        const response = await axiosInstance.get(apiUrl.questionTypeUrl.get)
        return response.data
    } catch (error) {
        console.log('Get question type failed')
    }
}
