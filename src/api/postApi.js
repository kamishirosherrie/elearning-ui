import axiosInstance from './axiosInstance'
import { apiUrl } from './apiConfig'

export const getTotalLikeByPostId = async (postId) => {
    try {
        const response = await axiosInstance.get(apiUrl.postUrl.totalLike(postId))
        return response.data
    } catch (error) {
        console.log('Get total like by post ID failed: ', error)
        throw error
    }
}

export const getAllPosts = async () => {
    try {
        const response = await axiosInstance.get(apiUrl.postUrl.get)
        return response.data
    } catch (error) {
        console.log('Get all posts failed: ', error)
        throw error
    }
}

export const getPostById = async (postId) => {
    try {
        const response = await axiosInstance.get(apiUrl.postUrl.getById(postId))
        return response.data
    } catch (error) {
        console.log('Get post by ID failed: ', error)
        throw error
    }
}

export const createPost = async (postData) => {
    try {
        const response = await axiosInstance.post(apiUrl.postUrl.create, postData)
        return response.data
    } catch (error) {
        console.log('Create post failed: ', error)
        throw error
    }
}

export const likePost = async (postId) => {
    try {
        const response = await axiosInstance.post(apiUrl.postUrl.like(postId))
        return response.data
    } catch (error) {
        console.log('Like post failed: ', error)
        throw error
    }
}

export const updatePost = async (postId, postData) => {
    try {
        const response = await axiosInstance.put(apiUrl.postUrl.update(postId), postData)
        return response.data
    } catch (error) {
        console.log('Update post failed: ', error)
        throw error
    }
}

export const deletePost = async (postId) => {
    try {
        const response = await axiosInstance.delete(apiUrl.postUrl.delete(postId))
        return response.data
    } catch (error) {
        console.log('Delete post failed: ', error)
        throw error
    }
}
