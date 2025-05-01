import React, { useEffect, useRef, useState } from 'react'
import ReactMarkDown from 'react-markdown'
import classNames from 'classnames/bind'
import styles from './SpeakingPractice.module.scss'
import Button from '../../../components/Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { getSpeakingReply } from '../../../api/aiApi'
import StudyZone from '../../../layouts/StudyZone/StudyZone'

const cx = classNames.bind(styles)

const topicContext = 'You are a friendly travel guide in Paris. Have a casual and natural conversation with a tourist.'
const initialAIMessage = 'Welcome to Paris! How can I help you with your trip today?'

function SpeakingPractice() {
    const [messages, setMessages] = useState([{ from: 'ai', text: initialAIMessage }])
    const [recording, setRecording] = useState(false)
    const [transcript, setTranscript] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const recognitionRef = useRef(null)
    const spokenTextRef = useRef('')

    const handleRecord = () => {
        setRecording((prev) => !prev)

        if (!recording && recognitionRef.current) {
            spokenTextRef.current = ''
            recognitionRef.current.start()
        } else if (recognitionRef.current) {
            recognitionRef.current.stop()
        }
    }

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition()
            recognition.continuous = false
            recognition.lang = 'en-US'

            recognition.onresult = (event) => {
                const text = event.results[0][0].transcript
                spokenTextRef.current = text
                setTranscript(text)
            }

            recognition.onend = async () => {
                setRecording(false)
                const spokenText = spokenTextRef.current.trim()
                if (!spokenText) return

                setMessages((prev) => [...prev, { from: 'user', text: spokenText }])
                setTranscript('')
                setIsLoading(true)

                const conversationHistory = [...messages, { from: 'user', text: spokenText }]
                const aiReply = await getSpeakingReply({
                    topicContext,
                    conversationHistory,
                    userAnswer: spokenText,
                })

                setMessages((prev) => [...prev, { from: 'ai', text: aiReply.reply }])
                setIsLoading(false)
                spokenTextRef.current = ''
            }

            recognition.onerror = (error) => {
                console.error('Speech recognition error:', error)
            }

            recognitionRef.current = recognition
        }
    }, [messages])

    return (
        <StudyZone>
            <div className={cx('speaking-wrapper')}>
                <h1 className={cx('speaking-title')}>🎤 Luyện nói cùng AI</h1>
                <p className={cx('speaking-context')}>
                    <strong>Chủ đề:</strong> {topicContext}
                </p>
                <div className={cx('speaking-card')}>
                    <div className={cx('speaking-chatbox')}>
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={cx('chat-bubble', { ai: msg.from === 'ai', user: msg.from === 'user' })}
                            >
                                <ReactMarkDown>{msg.text}</ReactMarkDown>
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
                    </div>
                    {transcript && (
                        <div className={cx('transcript-preview')}>
                            <strong>Bạn vừa nói:</strong> {transcript}
                        </div>
                    )}
                    <div className={cx('speaking-controls')}>
                        <Button primary onClick={handleRecord} className={cx('record-button', { recording })}>
                            <FontAwesomeIcon icon={faMicrophone} /> {recording ? 'Đang thu...' : 'Bắt đầu nói'}
                        </Button>
                    </div>
                </div>
            </div>
        </StudyZone>
    )
}

export default SpeakingPractice
