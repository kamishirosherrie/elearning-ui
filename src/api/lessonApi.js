import axiosInstance from './axiosInstance'
import { apiUrl } from './apiConfig'

export const addNewLesson = async (lesson) => {
    try {
        const response = await axiosInstance.post(apiUrl.lessonUrl.add, lesson)
        return response.data
    } catch (error) {
        console.log('Add new lesson failed')
        throw error
    }
}

export const getAllLesson = async () => {
    try {
        const response = await axiosInstance.get(apiUrl.lessonUrl.get)
        return response.data
    } catch (error) {
        console.log('Get all lesson failed')
        throw error
    }
}

export const getLessonBySlug = async (slug) => {
    try {
        const response = await axiosInstance.get(apiUrl.lessonUrl.getBySlug(slug))
        return response.data
    } catch (error) {
        console.log('Get lesson by slug failed')
        throw error
    }
}

export const getLessonByCourseSlug = async (slug) => {
    try {
        const response = await axiosInstance.get(apiUrl.lessonUrl.getByCourseSlug(slug))
        return response.data
    } catch (error) {
        console.log('Get lesson by course slug failed')
        throw error
    }
}

export const getLessonWithProgress = async (courseName) => {
    try {
        const response = await axiosInstance.get(apiUrl.lessonUrl.getWithUserProgress(courseName))
        return response.data
    } catch (error) {
        console.log('Get lesson with user progress failed: ', error)
        throw error
    }
}

export const getTotalLessonNumber = async (courseId) => {
    try {
        const response = await axiosInstance.get(apiUrl.lessonUrl.getTotalLessonNumber(courseId))
        return response.data.totalLesson
    } catch (error) {
        console.log('Get total lesson number failed: ', error)
        throw error
    }
}

export const updateLesson = async (lesson) => {
    try {
        const response = await axiosInstance.put(apiUrl.lessonUrl.update, lesson)
        return response.data
    } catch (error) {
        console.log('Update lesson failed: ', error)
        throw error
    }
}
