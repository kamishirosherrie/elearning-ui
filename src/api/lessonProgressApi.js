import { apiUrl } from './apiConfig'
import axiosInstance from './axiosInstance'

export const markLessonAsCompleted = async (lessonId) => {
    try {
        const response = await axiosInstance.put(apiUrl.lessonProgressUrl.markLessonAsCompleted(lessonId))
        return response.data
    } catch (error) {
        console.log('Mark lesson as completed failed: ', error)
        throw error
    }
}
