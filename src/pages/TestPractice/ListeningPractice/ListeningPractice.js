import { useContext, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './ListeningPractice.module.scss'
import { getQuizzeBySlug } from '../../../api/quizzeApi'
import { useParams } from 'react-router-dom'
import AuthContext from '../../../context/AuthContext'
import { getQuestionByQuizzeSlug } from '../../../api/questionApi'
import QuizzeHeader from '../../../components/QuizzeHeader/QuizzeHeader'
import StudyZone from '../../../layouts/StudyZone/StudyZone'
import OneChoice from '../../../components/QuestionType/OneChoice/OneChoice'
import { useLoading } from '../../../context/LoadingContext'
import { addNewSubmit } from '../../../api/submissionApi'
import Pagination from '../../../components/Pagination/Pagination'

const cx = classNames.bind(styles)

function ListeningPractice() {
    const { user } = useContext(AuthContext)
    const { quizzeSlug } = useParams()
    const { setIsLoading } = useLoading()

    const [quizze, setQuizze] = useState({})
    const [questions, setQuestions] = useState([])
    const [oneChoice, setOneChoice] = useState({})

    const [startTime, setStartTime] = useState(null)

    const [currentPart, setCurrentPart] = useState(1)
    const [totalParts, setTotalParts] = useState(1)

    const handleChange = (event, questionId) => {
        const { value } = event.target
        setOneChoice((prev) => ({
            ...prev,
            [questionId]: value,
        }))
    }

    const handleSubmit = async () => {
        const answers = questions
            .filter((question) => oneChoice[question._id])
            .map((question) => ({
                questionId: question._id,
                text: oneChoice[question._id],
            }))

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
        setStartTime(new Date())

        const getQuizzeInfo = async () => {
            try {
                setIsLoading(true)
                const quizze = await getQuizzeBySlug(quizzeSlug)
                const questions = await getQuestionByQuizzeSlug(quizzeSlug)
                console.log('Quizze: ', quizze)
                console.log('Questions: ', questions)

                setQuizze(quizze)
                setQuestions(questions.questions)
                setTotalParts(questions.totalPart || 1)
            } catch (error) {
                console.log('Get quizze failed: ', error)
            } finally {
                setIsLoading(false)
            }
        }

        getQuizzeInfo()
    }, [quizzeSlug, currentPart, setIsLoading])

    return (
        <StudyZone>
            <div className={cx('wrapper')}>
                <QuizzeHeader
                    title={quizze.title}
                    description={quizze.description}
                    time={quizze.time}
                    handleSubmit={handleSubmit}
                />
                <div className={cx('content-wrapper')}>
                    <div className={cx('content')}>
                        <div className={cx('audio-section')}>
                            <h3 className={cx('audio-title')}>Listening Audio</h3>
                            {quizze.audioUrl ? (
                                <audio controls className={cx('audio-player')}>
                                    <source src={quizze.audioUrl} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            ) : (
                                <p>No audio available</p>
                            )}
                        </div>
                        <div className={cx('questions-section')}>
                            {questions.map((question, index) => (
                                <div key={index} className={cx('question-wrapper')}>
                                    <div className={cx('question')}>
                                        <h3 className={cx('task-title')}>Question {index + 1}</h3>
                                        <p className={cx('task-content')}>{question.question}</p>
                                        {question.context && (
                                            <img src={question.context} alt="" className={cx('image')} />
                                        )}
                                    </div>
                                    <div className={cx('answer')}>
                                        {question.answer.map((answer, indexAnswer) => (
                                            <div key={indexAnswer}>
                                                <OneChoice
                                                    id={answer._id}
                                                    name={question._id}
                                                    value={answer.text}
                                                    checked={oneChoice[question._id] === answer.text}
                                                    onChange={(e) => handleChange(e, question._id)}
                                                    index={indexAnswer}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Pagination
                        currentPage={currentPart}
                        totalPages={totalParts}
                        onPageChange={(page) => setCurrentPart(page)}
                    />
                </div>
            </div>
        </StudyZone>
    )
}

export default ListeningPractice
