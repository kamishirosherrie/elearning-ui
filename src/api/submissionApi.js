import axios from 'axios'
import { apiUrl } from './apiConfig'

export const addNewSubmit = async (data) => {
    try {
        const response = await axios.post(apiUrl.submissionUrl.addNewSubmission, data)
        return response.data
    } catch (error) {
        console.log('Add new submit failed: ', error)
        throw error
    }
}
