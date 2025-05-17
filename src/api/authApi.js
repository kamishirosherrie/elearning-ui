import axiosInstance from './axiosInstance'
import { apiUrl } from './apiConfig'

export const loginUser = async (user) => {
    try {
        const response = await axiosInstance.post(apiUrl.authUrl.login, user)
        return response.data
    } catch (error) {
        console.log('Login failed: ', error)
    }
}

export const socialLogin = async (user) => {
    try {
        const response = await axiosInstance.post(apiUrl.authUrl.socialLogin, user)
        return response.data
    } catch (error) {
        console.log('Login failed: ', error)
    }
}

export const logoutUser = async () => {
    try {
        const response = await axiosInstance.post(apiUrl.authUrl.logout)
        return response.data
    } catch (error) {
        console.log('Logout failed: ', error)
    }
}

export const registerUser = async (user) => {
    try {
        const response = await axiosInstance.post(apiUrl.authUrl.register, user)
        return response.data
    } catch (error) {
        console.log('Register failed: ', error)
    }
}

export const changePassWord = async (user) => {
    try {
        const response = await axiosInstance.put(apiUrl.authUrl.changePassWord, user)
        return response.data
    } catch (error) {
        console.log('Change password failed: ', error)
    }
}

export const forgotPassWord = async (email) => {
    try {
        const response = await axiosInstance.post(apiUrl.authUrl.forgotPassWord, email)
        return response.data
    } catch (error) {
        console.log('Forgot password failed: ', error)
    }
}

export const verifyOtp = async (user) => {
    try {
        const response = await axiosInstance.post(apiUrl.authUrl.verifyOtp, user)
        return response.data
    } catch (error) {
        console.log('Verify otp failed: ', error)
    }
}

export const resetPassWord = async (user) => {
    try {
        const response = await axiosInstance.post(apiUrl.authUrl.resetPassWord, user)
        return response.data
    } catch (error) {
        console.log('Reset password failed: ', error)
    }
}
