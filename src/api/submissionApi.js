import axiosInstance from './axiosInstance'
import { apiUrl } from './apiConfig'

export const addNewSubmit = async (data) => {
    try {
        const response = await axiosInstance.post(apiUrl.submissionUrl.add, data)
        return response.data
    } catch (error) {
        console.log('Add new submit failed: ', error)
    }
}

export const submitWritingTest = async (data) => {
    try {
        const response = await axiosInstance.post(apiUrl.submissionUrl.submitWriting, data)
        return response.data.submission
    } catch (error) {
        console.log('Submit writing failed: ', error)
    }
}

export const getAllSubmissionsByUserId = async (userId, page = 1, limit = 10) => {
    try {
        const response = await axiosInstance.get(apiUrl.submissionUrl.getByUserId(userId, page, limit))
        return response.data
    } catch (error) {
        console.log('Get submission by user id failed: ', error)
    }
}

export const getSubmissionById = async (id) => {
    try {
        const response = await axiosInstance.get(apiUrl.submissionUrl.getById(id))
        return response.data.submission
    } catch (error) {
        console.log('Get user answer failed: ', error)
    }
}

export const getRanking = async () => {
    try {
        const response = await axiosInstance.get(apiUrl.submissionUrl.getGlobalRanking)
        return response.data.rankingWithRank
    } catch (error) {
        console.log('Get ranking failed: ', error)
    }
}
