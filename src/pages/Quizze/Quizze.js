import { useEffect, useState } from 'react'
import axios from 'axios'
import classNames from 'classnames/bind'
import styles from './Quizze.module.scss'
import { useParams } from 'react-router-dom'

const cx = classNames.bind(styles)

function Quizze() {
    const quizzeSlug = useParams().quizzeSlug
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        const getQuestion = async () => {
            try {
                const response = await axios.get('http://localhost:8017/question')
                console.log('Question:', response.data.questions)
                setQuestions(response.data.questions)
            } catch (error) {
                console.log('Error:', error)
            }
        }
        getQuestion()
    }, [])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1>Quizze title</h1>
                <button>Previous</button>
                <button>Next</button>
            </div>
            <div className={cx('content')}>
                {questions.map((question, index) => (
                    <div className={cx('question-wrapper')} key={index}>
                        <div className={cx('question')}>
                            <h3>Question {index + 1}</h3>
                            <span>{question.question}</span>
                        </div>
                        <div className={cx('answer')}>
                            <div className={cx('answer-item')}>
                                <input type="radio" name="answer" id="answer1" value="answer1" />
                                <label htmlFor="answer1">Ha Noi</label>
                            </div>
                            <div className={cx('answer-item')}>
                                <input type="radio" name="answer" id="answer2" value="answer2" />
                                <label htmlFor="answer2">Ho Chi Minh</label>
                            </div>
                            <div className={cx('answer-item')}>
                                <input type="radio" name="answer" id="answer3" value="answer3" />
                                <label htmlFor="answer3">Da Nang</label>
                            </div>
                            <div className={cx('answer-item')}>
                                <input type="radio" name="answer" id="answer4" value="answer4" />
                                <label htmlFor="answer4">Hue</label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Quizze
