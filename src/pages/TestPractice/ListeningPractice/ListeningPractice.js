import { useContext, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './ListeningPractice.module.scss'
import Writing from '../../../components/QuestionType/Writing/Writing'
import { getQuizzeBySlug } from '../../../api/quizzeApi'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../../../context/AuthContext'
import { getQuestionByQuizzeSlug } from '../../../api/questionApi'
import QuizzeHeader from '../../../components/QuizzeHeader/QuizzeHeader'
import StudyZone from '../../../layouts/StudyZone/StudyZone'
import OneChoice from '../../../components/QuestionType/OneChoice/OneChoice'
import { useLoading } from '../../../context/LoadingContext'
import { addNewSubmit } from '../../../api/submissionApi'
import { toast } from 'react-toastify'
import { routes } from '../../../routes/route'

const cx = classNames.bind(styles)

function ListeningPractice() {
    const { user } = useContext(AuthContext)
    const { quizzeSlug } = useParams()
    const navigate = useNavigate()
    const { setIsLoading } = useLoading()

    const [quizze, setQuizze] = useState({})
    const [questions, setQuestions] = useState([])
    const [oneChoice, setOneChoice] = useState({})

    const [startTime, setStartTime] = useState(null)

    const handleChange = (event, questionId) => {
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

        getQuizzeInfo()
    }, [quizzeSlug])

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
                    {questions.map((question, index) => (
                        <div key={index} className={cx('question-wrapper')}>
                            <div className={cx('question')}>
                                <h3 className={cx('task-title')}>{question.part}</h3>
                                <p className={cx('task-content')}>{question.question}</p>
                                {question.context && <img src={question.context} alt="" className={cx('image')} />}
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
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </StudyZone>
    )
}

export default ListeningPractice
