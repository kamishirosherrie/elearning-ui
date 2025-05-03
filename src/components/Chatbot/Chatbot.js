import React, { useContext, useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Chatbot.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faRobot, faTimes } from '@fortawesome/free-solid-svg-icons'
import { getChatHistory, talkWithAI } from '../../api/aiApi'
import Markdown from 'react-markdown'
import AuthContext from '../../context/AuthContext'

const cx = classNames.bind(styles)

function Chatbot() {
    const { user } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [userInput, setUserInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef()
    const chatbotRef = useRef()

    const toggleChatbot = () => {
        setIsOpen((prev) => !prev)
    }

    const handleSendMessage = async () => {
        if (userInput.trim()) {
            const newMessage = { from: 'user', text: userInput }
            const updatedMessages = [...messages, newMessage]
            console.log(updatedMessages)

            setMessages(updatedMessages)
            setUserInput('')

            try {
                setIsLoading(true)
                const replyMessage = await talkWithAI({
                    userMessage: userInput,
                    conversationHistory: updatedMessages,
                })
                setMessages((prev) => [...prev, { from: 'ai', text: replyMessage.reply }])
            } catch (error) {
                console.log('Failed to get response: ', error)
            } finally {
                setIsLoading(false)
            }
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage()
        }
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    useEffect(() => {
        const hanleClickOutSide = (event) => {
            if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', hanleClickOutSide)
        } else {
            document.removeEventListener('mousedown', hanleClickOutSide)
        }

        return () => {
            document.removeEventListener('mousedown', hanleClickOutSide)
        }
    }, [isOpen])

    useEffect(() => {
        const loadChatHistory = async () => {
            try {
                const history = await getChatHistory()
                console.log(history)

                if (history && history.chatHistory.message) {
                    setMessages(history.chatHistory.message)
                }
            } catch (error) {
                console.error('Lỗi khi tải lịch sử trò chuyện:', error)
            }
        }

        loadChatHistory()
    }, [user._id])

    return (
        <div className={cx('chatbot')}>
            <div className={cx('toggle-button', { hide: isOpen })} onClick={toggleChatbot}>
                {isOpen ? null : <FontAwesomeIcon icon={faRobot} />}
            </div>
            {isOpen && (
                <div ref={chatbotRef} className={cx('chat-window')}>
                    <div className={cx('header')}>
                        <h4>Trợ lí EMaster</h4>
                        <FontAwesomeIcon icon={faTimes} className={cx('close-icon')} onClick={toggleChatbot} />
                    </div>
                    <div className={cx('messages')}>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={cx('message', {
                                    user: message.from === 'user',
                                    ai: message.from === 'ai',
                                })}
                            >
                                <Markdown>{message.text}</Markdown>
                            </div>
                        ))}
                        {isLoading && (
                            <div className={cx('chat-bubble', 'ai')}>
                                <span className={cx('typing')}>
                                    <span className={cx('dot')}></span>
                                    <span className={cx('dot')}></span>
                                    <span className={cx('dot')}></span>
                                </span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
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
