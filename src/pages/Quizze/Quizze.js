import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Quizze.module.scss'
import { useParams } from 'react-router-dom'
import { getQuestionByQuizzeSlug } from '../../api/questionApi'
import { getQuizzeBySlug } from '../../api/quizzeApi'

const cx = classNames.bind(styles)

function Quizze() {
    const quizzeSlug = useParams().quizzeSlug
    const [quizze, setQuizze] = useState({})
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        const getQuestion = async () => {
            try {
                const response = await getQuestionByQuizzeSlug(quizzeSlug)
                const quizze = await getQuizzeBySlug(quizzeSlug)
                console.log('Question:', response)
                setQuestions(response)
                setQuizze(quizze)
            } catch (error) {
                console.log('Error:', error)
            }
        }
        getQuestion()
    }, [quizzeSlug])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1>{quizze.title}</h1>
                <button>Previous</button>
                <button>Next</button>
            </div>
            <div className={cx('content')}>
                {questions.map((question, indexQuestion) => (
                    <div className={cx('question-wrapper')} key={indexQuestion}>
                        <div className={cx('question')}>
                            <h3>Question {indexQuestion + 1}</h3>
                            <span>{question.question}</span>
                        </div>
                        <div className={cx('answer')}>
                            {question.answer.map((answer, indexAnswer) => (
                                <div className={cx('answer-item')} key={indexAnswer}>
                                    <input type="radio" name={'question' + indexQuestion} id={answer.text + indexAnswer} value={answer.text} />
                                    <label htmlFor={indexAnswer}>
                                        {indexAnswer + 1}. {answer.text}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Quizze
