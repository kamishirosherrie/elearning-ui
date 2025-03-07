import axios from 'axios'
import { apiUrl } from './apiConfig'

export const addNewLesson = async (lesson) => {
    try {
        const response = await axios.post(apiUrl.lessonUrl.addNewLesson, lesson)
        return response
    } catch (error) {
        console.log('Add new course failed')
        throw error
    }
}
