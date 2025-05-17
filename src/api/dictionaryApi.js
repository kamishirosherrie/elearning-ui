import { apiUrl } from './apiConfig'
import axios from 'axios'

export const getWord = async (word) => {
    try {
        const response = await axios.get(apiUrl.dictionaryUrl.getWord(word))
        return response
    } catch (error) {
        console.log('Get word failed')
    }
}
