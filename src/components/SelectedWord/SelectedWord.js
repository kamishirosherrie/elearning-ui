import classNames from 'classnames/bind'
import styles from './SelectedWord.module.scss'
import { useEffect, useState } from 'react'
import DictionaryModal from '../DictionaryModal/DictionaryModal'

const cx = classNames.bind(styles)

function SelectedWord({ children }) {
    const [selectedWord, setSelectedWord] = useState(null)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const [isOpen, setIsOpen] = useState(false)

    const handleSelectedWord = () => {
        const selection = window.getSelection()
        const word = selection.toString().trim()
        if (word.length > 0 && /^[a-zA-z]+$/.test(word)) {
            setSelectedWord(word)
            setIsOpen(true)

            // Get the position of the selected word
            const range = selection.getRangeAt(0)
            const rect = range.getBoundingClientRect()
            setPosition({ top: rect.top + window.scrollY + 20, left: rect.left + window.scrollX })
        } else {
            setSelectedWord(null)
        }
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    useEffect(() => {
        document.addEventListener('mouseup', handleSelectedWord)
        return () => document.removeEventListener('mouseup', handleSelectedWord)
    }, [])

    return (
        <div className={cx('wrapper')}>
            {children}
            {selectedWord && (
                <div style={{ position: 'absolute', top: position.top, left: position.left }}>
                    <DictionaryModal word={selectedWord} isOpen={isOpen} setIsOpen={closeModal} onClose={() => setSelectedWord(null)} />
                </div>
            )}
        </div>
    )
}

export default SelectedWord
