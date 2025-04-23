import { useContext, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './ListeningPractice.module.scss'
import Writing from '../../../components/QuestionType/Writing/Writing'
import { getQuizzeBySlug } from '../../../api/quizzeApi'
import { useParams } from 'react-router-dom'
import AuthContext from '../../../context/AuthContext'
import { getQuestionByQuizzeSlug } from '../../../api/questionApi'
import QuizzeHeader from '../../../components/QuizzeHeader/QuizzeHeader'
import StudyZone from '../../../layouts/StudyZone/StudyZone'

const cx = classNames.bind(styles)

function ListeningPractice() {
    const { user } = useContext(AuthContext)
    const { quizzeSlug } = useParams()

    const [quizze, setQuizze] = useState({})
    const [questions, setQuestions] = useState([])
    const [answer, setAnswer] = useState({})

    const [startTime, setStartTime] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setAnswer((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = () => {
        const enrichedAnswers = Object.entries(answer).map(([questionId, text]) => {
            const question = questions.find((question) => question.questionId === questionId)
            return {
                questionId,
                question: question?.content || '',
                imageUrl: question?.imageUrl || '',
                text,
            }
        })

        console.log('Submitted Writing:', enrichedAnswers)

        const endTime = new Date()
        const timeSpent = Math.floor((endTime - startTime) / 1000)

        const submissionData = {
            quizzeId: quizze._id,
            userId: user._id,
            timeTaken: timeSpent,
            answers: enrichedAnswers,
        }

        console.log('Submission Data:', submissionData)
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
                                <Writing
                                    name={question.questionId}
                                    onChange={handleChange}
                                    className={cx('textarea')}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </StudyZone>
    )
}

export default ListeningPractice
