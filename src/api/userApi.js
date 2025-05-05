import axiosInstance from './axiosInstance'
import { apiUrl } from './apiConfig'

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get(apiUrl.userUrl.get)
        return response.data
    } catch (error) {
        console.log('Get all users failed: ', error)
        throw error
    }
}

export const getUserById = async (userId) => {
    try {
        const response = await axiosInstance.get(apiUrl.userUrl.getById(userId))
        return response.data.user
    } catch (error) {
        console.log('Get user by id failed: ', error)
        throw error
    }
}

export const getUserByUserName = async (userName) => {
    try {
        const response = await axiosInstance.get(apiUrl.userUrl.getInfo(userName))
        return response.data
    } catch (error) {
        console.log('Get user info failed: ', error)
        throw error
    }
}

export const getUserCourses = async (userId) => {
    try {
        const response = await axiosInstance.get(apiUrl.userUrl.getCourses(userId))
        return response.data.user
    } catch (error) {
        console.log('Get user courses failed: ', error)
        throw error
    }
}

export const addNewUser = async (user) => {
    try {
        const response = await axiosInstance.post(apiUrl.userUrl.add, user)
        return response.data
    } catch (error) {
        console.log('Add new user failed')
        throw error
    }
}

export const updateUserProfile = async (user) => {
    try {
        const response = await axiosInstance.put(apiUrl.userUrl.update, user)
        return response.data
    } catch (error) {
        console.log('Update user failed: ', error)
        throw error
    }
}

export const deleteUser = async (userName) => {
    try {
        const response = await axiosInstance.put(apiUrl.userUrl.delete(userName))
        return response.data
    } catch (error) {
        console.log('Delete user failed: ', error)
        throw error
    }
}
