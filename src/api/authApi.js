import axiosInstance from './axiosInstance'
import { apiUrl } from './apiConfig'

export const loginUser = async (user) => {
    try {
        const response = await axiosInstance.post(apiUrl.authUrl.login, user)
        return response.data
    } catch (error) {
        console.log('Login failed: ', error.message)
        throw error
    }
}

export const socialLogin = async (user) => {
    try {
        const response = await axiosInstance.post(apiUrl.authUrl.socialLogin, user)
        return response.data
    } catch (error) {
        console.log('Login failed: ', error.message)
        throw error
    }
}

export const logoutUser = async () => {
    try {
        const response = await axiosInstance.post(apiUrl.authUrl.logout)
        return response.data
    } catch (error) {
        console.log('Logout failed: ', error.message)
        throw error
    }
}

export const registerUser = async (user) => {}
