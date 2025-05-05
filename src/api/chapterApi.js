import { apiUrl } from './apiConfig'
import axiosInstance from './axiosInstance'

export const getChapterByCourseId = async (courseId) => {
    try {
        const response = await axiosInstance.get(apiUrl.chapterUrl.getByCourseId(courseId))
        return response.data.chapters
    } catch (error) {
        console.error('Error fetching chapters:', error)
        throw error
    }
}
