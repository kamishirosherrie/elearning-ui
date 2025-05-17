import axiosInstance from './axiosInstance'
import { apiUrl } from './apiConfig'

export const getCommentsByPostId = async (postId) => {
    try {
        const response = await axiosInstance.get(apiUrl.commentUrl.get(postId))
        return response.data
    } catch (error) {
        console.log('Get comments by post ID failed: ', error)
    }
}

export const createComment = async (data) => {
    try {
        const response = await axiosInstance.post(apiUrl.commentUrl.create, data)
        return response.data
    } catch (error) {
        console.log('Create comment failed: ', error)
    }
}

export const updateComment = async (commentId, commentData) => {
    try {
        const response = await axiosInstance.put(apiUrl.commentUrl.update(commentId), commentData)
        return response.data
    } catch (error) {
        console.log('Update comment failed: ', error)
    }
}

export const deleteComment = async (commentId) => {
    try {
        const response = await axiosInstance.delete(apiUrl.commentUrl.delete(commentId))
        return response.data
    } catch (error) {
        console.log('Delete comment failed: ', error)
    }
}
