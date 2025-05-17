import axiosInstance from './axiosInstance'
import { apiUrl } from './apiConfig'
import axios from 'axios'

export const getGoogleUserInfo = async (accessToken) => {
    try {
        const response = await axiosInstance.get(apiUrl.googleUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: false,
        })
        return response.data
    } catch (error) {
        console.error('Error fetching user info from Google: ', error.message)
    }
}

export const getFacebookUserInfo = async (accessToken) => {
    try {
        const response = await axios.get(apiUrl.facebookUrl.getUserInfo(accessToken))
        return response.data
    } catch (error) {
        console.error('Error fetching user info from Facebook: ', error.message)
    }
}
