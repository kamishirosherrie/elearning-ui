import axiosInstance from './axiosInstance'
import { apiUrl } from './apiConfig'

export const getCourse = async () => {
    try {
        const response = await axiosInstance.get(apiUrl.courseUrl.get)
        return response.data
    } catch (error) {
        console.log('Get course failed: ', error)
        throw error
    }
}

export const getCourseBySlug = async (slug) => {
    try {
        const response = await axiosInstance.get(apiUrl.courseUrl.getBySlug(slug))
        return response.data.course
    } catch (error) {
        console.log('Get course by slug failed: ', error)
        throw error
    }
}

export const getCourseEnrollment = async (data) => {
    try {
        const response = await axiosInstance.get(apiUrl.courseUrl.getEnrollment, {
            params: {
                courseId: data.courseId,
                userId: data.userId,
            },
        })
        return response.data
    } catch (error) {
        console.log('Get course enrollment failed: ', error)
        throw error
    }
}

export const addNewCourse = async (course) => {
    try {
        const response = await axiosInstance.post(apiUrl.courseUrl.add, course)
        return response.data
    } catch (error) {
        console.log('Add new course failed: ', error)
        throw error
    }
}

export const addCourseEnrollment = async (courseData) => {
    try {
        const response = await axiosInstance.post(apiUrl.courseUrl.addEnrollment, courseData)
        return response.data
    } catch (error) {
        console.log('Subscribe failed: ', error)
        throw error
    }
}

export const updateCourse = async (course) => {
    try {
        const response = await axiosInstance.put(apiUrl.courseUrl.update, course)
        return response.data
    } catch (error) {
        console.log('Update course failed: ', error)
        throw error
    }
}

export const deleteCourse = async (id) => {
    try {
        const response = await axiosInstance.delete(apiUrl.courseUrl.delete(id))
        return response.data
    } catch (error) {
        console.log('Delete course failed: ', error)
        throw error
    }
}
