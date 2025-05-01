import { apiUrl } from './apiConfig'
import axiosInstance from './axiosInstance'

export const getSpeakingReply = async (dataMessage) => {
    try {
        const response = await axiosInstance.post(apiUrl.aiUrl.speakingReply, dataMessage)
        return response.data
    } catch (error) {
        console.log('Get speaking reply failed: ', error)
        throw error
    }
}

export const talkWithAI = async (dataMessage) => {
    try {
        const response = await axiosInstance.post(apiUrl.aiUrl.talkWithAI, dataMessage)
        return response.data
    } catch (error) {
        console.log('Get AI reply failed: ', error)
        throw error
    }
}
