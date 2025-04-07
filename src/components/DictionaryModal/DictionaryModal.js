import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './DictionaryModal.module.scss'
import { getWord } from '../../api/dictionaryApi'
import { VolumeIcon } from '../Icons/Icon'

const cx = classNames.bind(styles)

function Dictionary({ word, className }) {
    const [define, setDefine] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleOnClickAudio = (event) => {
        event.stopPropagation()
        const audioUrl = define?.phonetics[0]?.audio
        if (audioUrl) {
            const audio = new Audio(audioUrl)
            audio.play()
        } else {
            console.log('Audio not found')
        }
    }

    useEffect(() => {
        const defineWord = async () => {
            try {
                setIsLoading(true)
                const response = await getWord(word)
                setDefine(response.data[0])
                console.log(response.data[0])
            } catch (error) {
                console.log('Get word from Dictionary failed: ', error)
            } finally {
                setIsLoading(false)
            }
        }

        if (word) {
            defineWord()
        }
    }, [word])
    return (
        <div className={className}>
            {isLoading ? (
                <span>Loading...</span>
            ) : (
                <div className={cx('container')}>
                    {define ? (
                        <div className={cx('content')}>
                            <div className={cx('define-word')}>
                                <span>{define.phonetic}</span>
                                <span className={cx('audio-icon')} onClick={(e) => handleOnClickAudio(e)}>
                                    <VolumeIcon width={24} height={24} />
                                </span>
                            </div>
                            {define.meanings.map((meaning, index) => (
                                <div className={cx('define-word')} key={index}>
                                    <span>{meaning.partOfSpeech}</span>
                                    <span>{meaning.definitions[0]?.definition}</span>
                                    <span>Ex: {meaning.definitions[0]?.example}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <span>We can't find this word...</span>
                    )}
                </div>
            )}
        </div>
    )
}

export default Dictionary
