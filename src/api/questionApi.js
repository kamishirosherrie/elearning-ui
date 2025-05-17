import axiosInstance from './axiosInstance'
import { apiUrl } from './apiConfig'

export const getQuestionByQuizzeSlug = async (slug, part) => {
    try {
        const response = await axiosInstance.get(apiUrl.questionUrl.getByQuizzeSlug(slug, part))
        return response.data
    } catch (error) {
        console.log('Get question by quizze slug failed: ', error)
    }
}

export const addNewQuestion = async (question) => {
    try {
        const response = await axiosInstance.post(apiUrl.questionUrl.add, question)
        return response.data
    } catch (error) {
        console.log('Add new question failed: ', error)
    }
}
