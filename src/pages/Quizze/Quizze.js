import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal'
import classNames from 'classnames/bind'
import styles from './Quizze.module.scss'

import { getQuestionByQuizzeSlug } from '../../api/questionApi'
import { getQuizzeBySlug } from '../../api/quizzeApi'
import SelectedWord from '../../components/SelectedWord/SelectedWord'

const cx = classNames.bind(styles)
Modal.setAppElement('#root')

function Quizze() {
    const quizzeSlug = useParams().quizzeSlug
    const [quizze, setQuizze] = useState({})
    const [questions, setQuestions] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const [selectedAnswer, setSelectedAnswer] = useState({})
    const [totalScore, setTotalScore] = useState(0)

    useEffect(() => {
        const getQuestion = async () => {
            try {
                const response = await getQuestionByQuizzeSlug(quizzeSlug)
                const quizze = await getQuizzeBySlug(quizzeSlug)
                setQuestions(response)
                setQuizze(quizze)
            } catch (error) {
                console.log('Get question by quizze slug error:', error)
            }
        }
        getQuestion()
    }, [quizzeSlug])

    const closeModal = () => {
        setIsOpen(false)
    }

    const handleChangeAnswer = (event, questionId) => {
        const { value } = event.target
        setSelectedAnswer((prev) => ({
            ...prev,
            [questionId]: value,
        }))
    }

    const handleSubmit = () => {
        if (Object.keys(selectedAnswer).length === 0) {
            alert('Please choose an answer!')
        } else {
            setIsOpen(true)
            let score = 0
            questions.forEach((question) => {
                const correctAnswer = question.answer.find((answer) => answer.text === selectedAnswer[question._id])
                if (correctAnswer.isCorrect) {
                    score += 1
                }
            })
            setTotalScore(score)
            setSelectedAnswer({})
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1>{quizze.title}</h1>
                <button onClick={() => window.history.back()}>Back</button>
                <div className={cx('count')}>
                    Total: {Object.keys(selectedAnswer).length}/{questions.length}
                </div>
                <button type="submit" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
            <SelectedWord>
                {
                    <div className={cx('content')}>
                        {questions.map((question, indexQuestion) => (
                            <div className={cx('question-wrapper')} key={question._id}>
                                <div className={cx('question')}>
                                    <h3>Question {indexQuestion + 1}</h3>
                                    <span>{question.question}</span>
                                </div>
                                <div className={cx('answer')}>
                                    {question.answer.map((answer, indexAnswer) => (
                                        <div className={cx('answer-item')} key={answer._id}>
                                            <input
                                                type="radio"
                                                name={'question' + question._id}
                                                id={answer.text + answer._id}
                                                value={answer.text}
                                                onChange={(e) => handleChangeAnswer(e, question._id)}
                                                checked={selectedAnswer[question._id] === answer.text}
                                            />
                                            <label htmlFor={answer.text + answer._id}>
                                                {indexAnswer + 1}. {answer.text}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </SelectedWord>
            <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Total Exam">
                <h2>Submited successfully!</h2>
                <span>Your total score: {totalScore}</span>
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    )
}

export default Quizze
