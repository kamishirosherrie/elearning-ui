import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
import QuizzeHeader from '../../components/QuizzeHeader/QuizzeHeader'
import StudyZone from '../../layouts/StudyZone/StudyZone'
import { useLoading } from '../../context/LoadingContext'

const cx = classNames.bind(styles)

function Quizze() {
    const { user } = useContext(AuthContext)
    const quizzeSlug = useParams().quizzeSlug
    const { setIsLoading } = useLoading()

    const [quizze, setQuizze] = useState({})
    const [questions, setQuestions] = useState([])
    const [questionTypes, setQuestionTypes] = useState([])

    const [oneChoice, setOneChoice] = useState({})
    const [shortAnswer, setShortAnswer] = useState({})
    const [fillAnswer, setFillAnswer] = useState({})

    const [startTime, setStartTime] = useState(null)

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
        const answers = []

        questions.forEach((question) => {
            switch (question.questionTypeId._id) {
                case questionTypes[0]._id:
                    answers.push({ questionId: question._id, text: oneChoice[question._id] || '' })
                    break
                case questionTypes[2]._id:
                    answers.push({ questionId: question._id, text: shortAnswer[question._id] || '' })
                    break
                case questionTypes[3]._id:
                    answers.push({ questionId: question._id, text: fillAnswer[question._id] || '' })
                    break
                default:
                    break
            }
        })

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
            setIsLoading(true)
            const response = await addNewSubmit(submissionData)
            console.log(response)
            return response
        } catch (error) {
            console.log('Submission failed:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const getQuestion = async () => {
            try {
                setIsLoading(true)
                const response = await getQuestionByQuizzeSlug(quizzeSlug)
                const quizze = await getQuizzeBySlug(quizzeSlug)
                setQuizze(quizze)
                setQuestions(response.questions)
                setStartTime(new Date())
            } catch (error) {
                console.log('Get question by quizze slug error:', error)
            } finally {
                setIsLoading(false)
            }
        }

        const getTypeOfQuestion = async () => {
            const response = await getQuestionType()

            setQuestionTypes(response.questionTypes)
        }

        getQuestion()
        getTypeOfQuestion()
    }, [quizzeSlug, setIsLoading])

    return (
        <StudyZone>
            <div className={cx('wrapper')}>
                <QuizzeHeader
                    title={quizze.title}
                    description={quizze.description}
                    time={quizze.time}
                    handleSubmit={handleSubmit}
                />
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
                                                index={indexAnswer}
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
            </div>
        </StudyZone>
    )
}

export default Quizze
