import axios from 'axios'
import { apiUrl } from './apiConfig'

export const loginUser = async (user) => {
    try {
        const response = await axios.post(apiUrl.authUrl.login, user)
        return response.data
    } catch (error) {
        console.log('Login failed: ', error.message)
        throw error
    }
}

export const loginWithGoogle = async (user) => {
    try {
        const response = await axios.post(apiUrl.authUrl.loginWithGoogle, user)
        return response.data
    } catch (error) {
        console.log('Login failed: ', error.message)
        throw error
    }
}

export const registerUser = async (user) => {}
