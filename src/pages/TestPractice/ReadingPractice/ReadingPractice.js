import { useContext, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from '../TestPractice.module.scss'
import { getQuizzeBySlug } from '../../../api/quizzeApi'
import { useParams } from 'react-router-dom'
import AuthContext from '../../../context/AuthContext'
import { getAvailableParts, getQuestionByQuizzeSlug } from '../../../api/questionApi'
import QuizzeHeader from '../../../components/QuizzeHeader/QuizzeHeader'
import StudyZone from '../../../layouts/StudyZone/StudyZone'
import OneChoice from '../../../components/QuestionType/OneChoice/OneChoice'
import { useLoading } from '../../../context/LoadingContext'
import { addNewSubmit } from '../../../api/submissionApi'

const cx = classNames.bind(styles)

function ReadingPractice() {
    const { user } = useContext(AuthContext)
    const { quizzeSlug } = useParams()
    const { setIsLoading } = useLoading()

    const [currentPart, setCurrentPart] = useState(null)
    const [listParts, setListParts] = useState([])
    const [quizze, setQuizze] = useState({})
    const [questions, setQuestions] = useState([])
    const [startTime, setStartTime] = useState(null)
    const [oneChoice, setOneChoice] = useState({})

    const handleChangeOneChoice = (event, questionId) => {
        const { value } = event.target
        setOneChoice((prev) => ({
            ...prev,
            [questionId]: value,
        }))
    }

    const handleSubmit = async () => {
        const answers = []
        questions.forEach((question) => {
            answers.push({ questionId: question._id, text: oneChoice[question._id] || '' })
        })

        const endTime = new Date()
        const timeSpent = Math.floor((endTime - startTime) / 1000)

        const submissionData = {
            quizzeId: quizze._id,
            userId: user._id,
            timeTaken: timeSpent,
            answers: answers,
        }

        try {
            setIsLoading(true)
            const response = await addNewSubmit(submissionData)
            return response
        } catch (error) {
            console.log('Submission failed:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const initQuizze = async () => {
            try {
                setIsLoading(true)
                const quizze = await getQuizzeBySlug(quizzeSlug)
                const listParts = await getAvailableParts(quizzeSlug)
                console.log('listParts: ', listParts)

                setQuizze(quizze)
                setListParts(listParts.parts || [])
                setCurrentPart(listParts.parts?.[0] || null)
            } catch (error) {
                console.error('Init quizze failed: ', error)
            } finally {
                setIsLoading(false)
            }
        }

        initQuizze()
        setStartTime(new Date())
    }, [quizzeSlug, setIsLoading])

    useEffect(() => {
        const getQuestions = async () => {
            if (!quizzeSlug || !currentPart) return
            try {
                setIsLoading(true)
                const questions = await getQuestionByQuizzeSlug(quizzeSlug, currentPart)
                setQuestions(questions.questions)
                console.log('questions: ', questions.questions)
            } catch (err) {
                console.error('Lỗi lấy câu hỏi: ', err)
            } finally {
                setIsLoading(false)
            }
        }

        getQuestions()
    }, [quizzeSlug, currentPart, setIsLoading])

    return (
        <StudyZone>
            <div className={cx('wrapper')}>
                <QuizzeHeader title={quizze.title} description={quizze.description} time={quizze.time} handleSubmit={handleSubmit} />
                <div className={cx('content-wrapper')}>
                    <div className={cx('header')}>Part {currentPart}</div>
                    <div className={cx('content')}>
                        {questions.map((question, index) => (
                            <div key={index} className={cx('question-wrapper')}>
                                <div className={cx('question')}>
                                    <h3 className={cx('task-title')}>Câu {index + 1}</h3>
                                    <p>{question.introduction}</p>
                                    {question.context && (
                                        <p className={cx('task-context')}>
                                            Answer the question following the context: <br />
                                            {question.context}
                                        </p>
                                    )}
                                    <p className={cx('task-content')}>{question.question}</p>
                                </div>
                                <div className={cx('answer')}>
                                    {question.answer.map((answer, indexAnswer) => (
                                        <div key={indexAnswer}>
                                            <OneChoice id={answer._id} name={question._id} value={answer.text} checked={oneChoice[question._id] === answer.text} onChange={(e) => handleChangeOneChoice(e, question._id)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    {listParts.length > 0 && (
                        <div className={cx('fixed-parts')}>
                            {listParts.map((part, idx) => (
                                <button key={part} className={cx('part-btn', { active: part === currentPart })} onClick={() => setCurrentPart(part)}>
                                    Part {part}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </StudyZone>
    )
}

export default ReadingPractice
