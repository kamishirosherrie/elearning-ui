import axiosInstance from './axiosInstance'
import { apiUrl } from './apiConfig'

export const getGoogleUserInfo = async (accessToken) => {
    try {
        const response = await axiosInstance.get(apiUrl.googleUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: false,
        })
        return response.data
    } catch (error) {
        console.error('Error fetching user info from Google: ', error.message)
        throw error
    }
}

export const getFacebookUserInfo = async (accessToken) => {
    try {
        const response = await axiosInstance.get(apiUrl.facebookUrl.getUserInfo(accessToken))
        return response.data
    } catch (error) {
        console.error('Error fetching user info from Facebook: ', error.message)
        throw error
    }
}
