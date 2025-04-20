import { useContext, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './ListeningPractice.module.scss'
import StudyZone from '../../../layouts/StudyZone/StudyZone'
import ModalPopup from '../../../components/ModalPopup/ModalPopup'
import Writing from '../../../components/QuestionType/Writing/Writing'
import { getQuizzeBySlug } from '../../../api/quizzeApi'
import { Link, useParams } from 'react-router-dom'
import AuthContext from '../../../context/AuthContext'
import { getQuestionByQuizzeSlug } from '../../../api/questionApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { routes } from '../../../routes/route'
import QuizzeHeader from '../../../components/QuizzeHeader/QuizzeHeader'

const cx = classNames.bind(styles)

function ListeningPractice() {
    const { user } = useContext(AuthContext)
    const { quizzeSlug } = useParams()

    const [quizze, setQuizze] = useState({})
    const [questions, setQuestions] = useState([])
    const [answer, setAnswer] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    const [startTime, setStartTime] = useState(null)
    const [timerKey, setTimerKey] = useState(0)

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
        setIsOpen(true)
        setIsPaused(true)

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

    const closeModal = () => {
        setIsOpen(false)
        setStartTime(new Date())
        setTimerKey((prevKey) => prevKey + 1)
        setIsPaused(false)
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
                    timerKey={timerKey}
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
                                <Writing
                                    name={question.questionId}
                                    onChange={handleChange}
                                    className={cx('textarea')}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <ModalPopup isOpen={isOpen} closeModal={closeModal} className={cx('modal-point', 'overlay')}>
                    <div className={cx('modal-content')}>
                        <h2>Submited successfully!</h2>
                        <Link to={routes.mySubmission} className={cx('link')} onClick={closeModal}>
                            Xem kết quả <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </div>
                </ModalPopup>
            </div>
        </StudyZone>
    )
}

export default ListeningPractice
