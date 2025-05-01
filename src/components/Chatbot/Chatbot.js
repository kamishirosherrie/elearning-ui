import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Chatbot.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faRobot, faTimes } from '@fortawesome/free-solid-svg-icons'
import { talkWithAI } from '../../api/aiApi'

const cx = classNames.bind(styles)

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [userInput, setUserInput] = useState('')

    const toggleChatbot = () => {
        setIsOpen((prev) => !prev)
    }

    const handleSendMessage = async () => {
        if (userInput.trim()) {
            try {
                const replyMessage = await talkWithAI({})
            } catch (error) {
                console.log('Failed to get response: ', error)
            }

            setUserInput('')
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage()
        }
    }

    return (
        <div className={cx('chatbot')}>
            <div className={cx('toggle-button', { hide: isOpen })} onClick={toggleChatbot}>
                {isOpen ? null : <FontAwesomeIcon icon={faRobot} />}
            </div>
            {isOpen && (
                <div className={cx('chat-window')}>
                    <div className={cx('header')}>
                        <h3>AI Chatbot</h3>
                        <FontAwesomeIcon icon={faTimes} className={cx('close-icon')} onClick={toggleChatbot} />
                    </div>
                    <div className={cx('messages')}>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={cx('message', {
                                    user: message.sender === 'user',
                                    bot: message.sender === 'bot',
                                })}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <div className={cx('input-area')}>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button onClick={handleSendMessage}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Chatbot
