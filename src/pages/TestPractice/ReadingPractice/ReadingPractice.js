import { useContext, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './ReadingPractice.module.scss'
import Writing from '../../../components/QuestionType/Writing/Writing'
import { getQuizzeBySlug } from '../../../api/quizzeApi'
import { useParams } from 'react-router-dom'
import AuthContext from '../../../context/AuthContext'
import { getQuestionByQuizzeSlug } from '../../../api/questionApi'
import QuizzeHeader from '../../../components/QuizzeHeader/QuizzeHeader'
import StudyZone from '../../../layouts/StudyZone/StudyZone'
import { getQuestionType } from '../../../api/questionTypeApi'
import OneChoice from '../../../components/QuestionType/OneChoice/OneChoice'
import ShortAnswer from '../../../components/QuestionType/ShortAnswer/ShortAnswer'
import FillTheBlank from '../../../components/QuestionType/FillTheBlank/FillTheBlank'
import { useLoading } from '../../../context/LoadingContext'
import { addNewSubmit } from '../../../api/submissionApi'

const cx = classNames.bind(styles)

function ReadingPractice() {
    const { user } = useContext(AuthContext)
    const { quizzeSlug } = useParams()
    const { setIsLoading } = useLoading()

    const [quizze, setQuizze] = useState({})
    const [questions, setQuestions] = useState([])
    const [questionTypes, setQuestionTypes] = useState([])
    const [answer, setAnswer] = useState({})
    const [isPaused, setIsPaused] = useState(false)

    const [startTime, setStartTime] = useState(null)

    const [oneChoice, setOneChoice] = useState({})
    const [shortAnswer, setShortAnswer] = useState({})
    const [fillAnswer, setFillAnswer] = useState({})

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
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setStartTime(new Date())

        const getQuizzeInfo = async () => {
            try {
                const quizze = await getQuizzeBySlug(quizzeSlug)
                const questions = await getQuestionByQuizzeSlug(quizzeSlug)
                console.log('Quizze: ', quizze)
                console.log('Questions: ', questions)

                setQuizze(quizze)
                setQuestions(questions)
            } catch (error) {
                console.log('Get quizze failed: ', error)
            }
        }
        const getTypeOfQuestion = async () => {
            const response = await getQuestionType()

            setQuestionTypes(response.questionTypes)
        }

        getTypeOfQuestion()

        getQuizzeInfo()
    }, [quizzeSlug])

    return (
        <StudyZone>
            <div className={cx('wrapper')}>
                <QuizzeHeader
                    title={quizze.title}
                    description={quizze.description}
                    time={quizze.time}
                    isPaused={isPaused}
                    handleSubmit={handleSubmit}
                />
                <div className={cx('content')}>
                    {questions.map((question, index) => (
                        <div key={index} className={cx('question-wrapper')}>
                            <div className={cx('question')}>
                                <h3 className={cx('task-title')}>{question.part}</h3>
                                <p className={cx('task-content')}>{question.question}</p>
                                {question.context && <img src={question.context} alt="" className={cx('image')} />}
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
            </div>
        </StudyZone>
    )
}

export default ReadingPractice
