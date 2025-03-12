import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import classNames from 'classnames/bind'
import styles from './DictionaryModal.module.scss'
import { getWord } from '../../api/dictionaryApi'
import { VolumeIcon } from '../Icons/Icon'

const cx = classNames.bind(styles)
Modal.setAppElement('#root')

function Dictionary({ word, isOpen, closeModal }) {
    const [define, setDefine] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

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

    const handleOnClickAudio = (event) => {
        event.stopPropagation()
        const audioUrl = define?.phonetics[0].audio
        if (audioUrl) {
            const audio = new Audio(audioUrl)
            audio.play()
        }
    }

    useEffect(() => {
        if (word) {
            defineWord()
        }
    }, [word])
    return (
        <div className={cx('wrapper')}>
            <Modal isOpen={isOpen} contentLabel="Dictionary" onRequestClose={closeModal}>
                {isLoading ? (
                    <span>Loading...</span>
                ) : (
                    <div className={cx('container')}>
                        {define ? (
                            <div className={cx('content')}>
                                <div className={cx('define-word')}>
                                    <span>{define.phonetic}</span>
                                    <span onClick={(e) => handleOnClickAudio(e)}>
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
            </Modal>
        </div>
    )
}

export default Dictionary
