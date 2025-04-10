import axiosInstance from './axiosInstance'
import { apiUrl } from './apiConfig'

export const addNewLesson = async (lesson) => {
    try {
        const response = await axiosInstance.post(apiUrl.lessonUrl.addNewLesson, lesson)
        return response.data
    } catch (error) {
        console.log('Add new lesson failed')
        throw error
    }
}

export const getAllLesson = async () => {
    try {
        const response = await axiosInstance.get(apiUrl.lessonUrl.getAllLesson)
        return response.data
    } catch (error) {
        console.log('Get all lesson failed')
        throw error
    }
}

export const getLessonBySlug = async (slug) => {
    try {
        const response = await axiosInstance.get(apiUrl.lessonUrl.getLessonBySlug(slug))
        return response.data
    } catch (error) {
        console.log('Get lesson by slug failed')
        throw error
    }
}

export const getLessonByCourseSlug = async (slug) => {
    try {
        const response = await axiosInstance.get(apiUrl.lessonUrl.getLessonByCourseSlug(slug))
        return response.data
    } catch (error) {
        console.log('Get lesson by course slug failed')
        throw error
    }
}

export const getTotalLessonNumber = async (courseId) => {
    try {
        const response = await axiosInstance.get(apiUrl.lessonUrl.getTotalLessonNumber(courseId))
        return response.data.totalLesson
    } catch (error) {
        console.log('Get total lesson number failed')
        throw error
    }
}

export const updateLesson = async (lesson) => {
    try {
        const response = await axiosInstance.put(apiUrl.lessonUrl.updateLesson, lesson)
        return response.data
    } catch (error) {
        console.log('Update lesson failed')
        throw error
    }
}
