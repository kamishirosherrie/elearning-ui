import axiosInstance from './axiosInstance'
import { apiUrl } from './apiConfig'

export const getQuizzesWithQuestions = async () => {
    try {
        const response = await axiosInstance.get(apiUrl.quizzeUrl.getQuizzesWithQuestions)
        return response.data
    } catch (error) {
        console.log('Get all quizze failed')
        throw error
    }
}

export const getQuizzeBySlug = async (slug) => {
    try {
        const response = await axiosInstance.get(apiUrl.quizzeUrl.getBySlug(slug))
        return response.data.quizze
    } catch (error) {
        console.log('Get quizze by slug failed')
        throw error
    }
}

export const getQuizzeByLessonSlug = async (lessonSlug) => {
    try {
        const response = await axiosInstance.get(apiUrl.quizzeUrl.getByLessonSlug(lessonSlug))
        return response.data.quizze
    } catch (error) {
        console.log('Get quizze by lesson slug failed')
        throw error
    }
}

export const getQuizzeByType = async (quizzeType) => {
    try {
        const response = await axiosInstance.get(apiUrl.quizzeUrl.getByType(quizzeType))
        return response.data.quizzes
    } catch (error) {
        console.log('Get quizze by type failed')
        throw error
    }
}

export const addNewQuizze = async (quizze) => {
    try {
        const response = await axiosInstance.post(apiUrl.quizzeUrl.add, quizze)
        return response.data
    } catch (error) {
        console.log('Add new quizze failed')
        throw error
    }
}
