import classNames from 'classnames/bind'
import styles from './SelectedWord.module.scss'
import { useEffect, useState } from 'react'
import Dictionary from '../DictionaryModal/DictionaryModal'

const cx = classNames.bind(styles)

function SelectedWord({ children }) {
    const [selectedWord, setSelectedWord] = useState(null)
    const [position, setPosition] = useState({ top: 0, left: 0 })

    useEffect(() => {})

    return (
        <div className={cx('wrapper')}>
            {children}
            {selectedWord && (
                <div style={{ position: 'absolute', top: position.top, left: position.left }}>
                    <Dictionary word={selectedWord} onClose={() => setSelectedWord(null)} />
                </div>
            )}
        </div>
    )
}

export default SelectedWord
