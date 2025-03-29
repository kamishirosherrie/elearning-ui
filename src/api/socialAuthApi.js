import axios from 'axios'
import { apiUrl } from './apiConfig'

export const getGoogleUserInfo = async (accessToken) => {
    try {
        const response = await axios.get(apiUrl.googleUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        return response.data
    } catch (error) {
        console.error('Error fetching user info from Google: ', error.message)
        throw error
    }
}

export const getFacebookUserInfo = async (accessToken) => {
    try {
        const response = await axios.get(apiUrl.facebookUrl.getUserInfo(accessToken))
        return response.data
    } catch (error) {
        console.error('Error fetching user info from Facebook: ', error.message)
        throw error
    }
}
