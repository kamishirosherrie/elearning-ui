import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal'
import classNames from 'classnames/bind'
import styles from './Quizze.module.scss'

import { getQuestionByQuizzeSlug } from '../../api/questionApi'
import { getQuizzeBySlug } from '../../api/quizzeApi'
import { getQuestionType } from '../../api/questionTypeApi'
import FillTheBlank from '../../components/QuestionType/FillTheBlank/FillTheBlank'
import ShortAnswer from '../../components/QuestionType/ShortAnswer/ShortAnswer'
import OneChoice from '../../components/QuestionType/OneChoice/OneChoice'
import { addNewSubmit } from '../../api/submissionApi'
import AuthContext from '../../context/AuthContext'
import StudyZone from '../../layouts/StudyZone/StudyZone'
import Button from '../../components/Button/Button'
import CountdownTimer from '../../components/CountdownTimer/CountdownTimer'
import ModalPopup from '../../components/ModalPopup/ModalPopup'

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
    const [startTime, setStartTime] = useState(null)
    const [timerKey, setTimerKey] = useState(0)

    const handleOnExpire = () => {
        alert('Time out')
    }

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
        const answers = []

        questions.forEach((question) => {
            switch (question.questionTypeId._id) {
                case questionTypes[0]._id:
                    const correctAnswer = question.answer.find((answer) => answer.isCorrect === true)
                    if (oneChoice[question._id] === correctAnswer.text) {
                        score += 1
                    }
                    answers.push({ questionId: question._id, text: oneChoice[question._id] || '' })
                    break
                case questionTypes[2]._id:
                    if (question.answer[0].text.includes(shortAnswer[question._id])) {
                        score += 1
                    }
                    answers.push({ questionId: question._id, text: shortAnswer[question._id] || '' })
                    break
                case questionTypes[3]._id:
                    const correctAnswers = question.answer.map((answer) => answer.text)
                    if (correctAnswers.includes(fillAnswer[question._id])) {
                        score += 1
                    }
                    answers.push({ questionId: question._id, text: fillAnswer[question._id] || '' })
                    break
                default:
                    break
            }
        })

        setTotalScore(score)

        const endTime = new Date()
        const timeSpent = Math.floor((endTime - startTime) / 1000)

        const submissionData = {
            quizzeId: quizze._id,
            userId: user._id,
            timeTaken: timeSpent,
            answers: answers,
        }

        console.log('Submission Data:', submissionData)

        try {
            const response = await addNewSubmit(submissionData)
            console.log(response)
            setStartTime(new Date())
            setTimerKey((prevKey) => prevKey + 1)
        } catch (error) {
            console.log('Submission failed:', error)
        }
    }

    useEffect(() => {
        const getQuestion = async () => {
            try {
                const response = await getQuestionByQuizzeSlug(quizzeSlug)
                const quizze = await getQuizzeBySlug(quizzeSlug)
                setQuizze(quizze)
                setQuestions(response)
                setStartTime(new Date())
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

    return (
        <StudyZone>
            <div className={cx('header')}>
                <h1>{quizze.title}</h1>
                <p>{quizze.description}</p>
                <div className={cx('action')}>
                    <Button blue border5 onClick={() => window.history.back()}>
                        Back
                    </Button>
                    {Number(quizze.time) > 0 && (
                        <div className={cx('count')}>
                            Time left:
                            <CountdownTimer
                                key={timerKey}
                                initialTime={Number(quizze.time) * 60}
                                onExpire={handleOnExpire}
                            />
                        </div>
                    )}

                    <Button blue border5 type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
            <div className={cx('content')}>
                {questions.map((question, indexQuestion) => (
                    <div className={cx('question-wrapper')} key={question._id}>
                        <div className={cx('question')}>
                            <h3>Question {indexQuestion + 1}.</h3>
                            <span>{question.question}</span>
                        </div>
                        <div className={cx('answer')}>
                            {question.questionTypeId._id === questionTypes[0]._id ? (
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
                            ) : question.questionTypeId._id === questionTypes[2]._id ? (
                                <ShortAnswer
                                    id={question._id}
                                    name={question._id}
                                    onChange={(e) => handleChangeShortAnswer(question._id)}
                                />
                            ) : question.questionTypeId._id === questionTypes[3]._id ? (
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
            <ModalPopup isOpen={isOpen} closeModal={closeModal} className={cx('modal-point', 'overlay')}>
                <div className={cx('modal-content')}>
                    <h2>Submited successfully!</h2>
                    <span>Your total score: {totalScore}</span>
                </div>
            </ModalPopup>
        </StudyZone>
    )
}

export default Quizze
