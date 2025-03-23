import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal'
import classNames from 'classnames/bind'
import styles from './Quizze.module.scss'

import { getQuestionByQuizzeSlug } from '../../api/questionApi'
import { getQuizzeBySlug } from '../../api/quizzeApi'
import SelectedWord from '../../components/SelectedWord/SelectedWord'
import { getQuestionType } from '../../api/questionTypeApi'
import FillTheBlank from '../../components/QuestionType/FillTheBlank/FillTheBlank'
import ShortAnswer from '../../components/QuestionType/ShortAnswer/ShortAnswer'
import OneChoice from '../../components/QuestionType/OneChoice/OneChoice'
import { addNewSubmit } from '../../api/submissionApi'
import AuthContext from '../../context/AuthContext'

const cx = classNames.bind(styles)
Modal.setAppElement('#root')

function Quizze() {
    const { user } = useContext(AuthContext)
    const quizzeSlug = useParams().quizzeSlug
    const [quizze, setQuizze] = useState({})
    const [questions, setQuestions] = useState([])
    const [questionTypes, setQuestionTypes] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const [oneChoice, setOneChoice] = useState({})
    const [shortAnswer, setShortAnswer] = useState({})
    const [fillAnswer, setFillAnswer] = useState({})

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

        const getTypeOfQuestion = async () => {
            const response = await getQuestionType()
            setQuestionTypes(response.questionTypes)
        }

        getQuestion()
        getTypeOfQuestion()
    }, [quizzeSlug])

    const closeModal = () => {
        setIsOpen(false)
    }

    const handleChangeOneChoice = (event, questionId) => {
        const { value } = event.target
        setOneChoice((prev) => ({
            ...prev,
            [questionId]: value,
        }))
    }

    const handleChangeShortAnswer = (event, questionId) => {
        const { value } = event.target
        setShortAnswer((prev) => ({ ...prev, [questionId]: value }))
    }

    const handleChangeFillAnswer = (event, questionId) => {
        const { value } = event.target
        setFillAnswer((prev) => ({ ...prev, [questionId]: value }))
    }

    const handleSubmit = async () => {
        setIsOpen(true)
        let score = 0
        questions.forEach((question) => {
            if (question.questionTypeId === questionTypes[0]._id) {
                const correctAnswer = question.answer.find((answer) => answer.isCorrect === true)
                if (oneChoice[question._id] === correctAnswer.text) {
                    score += 1
                }
            } else if (question.questionTypeId === questionTypes[2]._id) {
                if (shortAnswer[question._id] === question.answer[0].text) {
                    score += 1
                }
            } else if (question.questionTypeId === questionTypes[3]._id) {
                if (question.answer[0].text.includes(fillAnswer[question._id])) {
                    score += 1
                }
            }
        })
        setTotalScore(score)

        await addNewSubmit({ quizzeId: quizze._id, score, userId: user.user._id })
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1>{quizze.title}</h1>
                <p>{quizze.description}</p>
                <button onClick={() => window.history.back()}>Back</button>
                <div className={cx('count')}>
                    Total: {Object.keys(oneChoice).length}/{questions.length}
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
                                    {question.questionTypeId === questionTypes[0]._id ? (
                                        question.answer.map((answer, indexAnswer) => (
                                            <div key={indexAnswer}>
                                                <OneChoice
                                                    id={answer._id}
                                                    name={question._id}
                                                    value={answer.text}
                                                    checked={oneChoice[question._id] === answer.text}
                                                    onChange={(e) => handleChangeOneChoice(e, question._id)}
                                                />
                                            </div>
                                        ))
                                    ) : question.questionTypeId === questionTypes[2]._id ? (
                                        <ShortAnswer
                                            id={question._id}
                                            name={question._id}
                                            onChange={(e) => handleChangeShortAnswer(question._id)}
                                        />
                                    ) : question.questionTypeId === questionTypes[3]._id ? (
                                        <FillTheBlank
                                            id={question._id}
                                            name={question._id}
                                            onChange={(e) => handleChangeFillAnswer(e, question._id)}
                                        />
                                    ) : null}
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
