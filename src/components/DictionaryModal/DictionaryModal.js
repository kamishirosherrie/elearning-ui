import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Dictionary.module.scss'
import { getWord } from '../../api/dictionaryApi'

const cx = classNames.bind(styles)

function Dictionary({ word }) {
    const [define, setDefine] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const defineWord = async () => {
        try {
            setIsLoading(true)
            const response = await getWord(word)
            setDefine(response.data)
            console.log(response.data)
        } catch (error) {
            console.log('Get word from Dictionary failed: ', error)
        }
    }
    useEffect(() => {
        if (word) {
            defineWord()
            setIsLoading(false)
        }
    }, [word])
    return <div className={cx('wrapper')}></div>
}

export default Dictionary
