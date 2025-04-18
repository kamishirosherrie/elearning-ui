import { useContext, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './WritingPractice.module.scss'
import StudyZone from '../../layouts/StudyZone/StudyZone'
import Button from '../../components/Button/Button'
import ModalPopup from '../../components/ModalPopup/ModalPopup'
import Writing from '../../components/QuestionType/Writing/Writing'
import CountdownTimer from '../../components/CountdownTimer/CountdownTimer'
import { getQuizzeBySlug } from '../../api/quizzeApi'
import { Link, useParams } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { getQuestionByQuizzeSlug } from '../../api/questionApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { routes } from '../../routes/route'

const cx = classNames.bind(styles)

const writingExam = {
    id: 1,
    title: 'TOEIC Writing Practice Test',
    description: 'Practice your writing skills with this TOEIC Writing Practice Test.',
    sections: [
        {
            questionId: '67deed29e78fa892dd3be2a2',
            questionTypeId: '67ff3251a73bf8253bab8772',
            title: 'Task 1: Write a Sentence Based on a Picture',
            content: 'Look at the picture and write a sentence that describes what is happening.',
        },
        {
            questionId: '67deed29e78fa892dd3be2a4',
            questionTypeId: '67ff3251a73bf8253bab8772',
            title: 'Task 2: Respond to a Written Request',
            content: 'Read the email below and write a response to the request.',
        },
        {
            questionId: '67deed29e78fa892dd3be2b0',
            questionTypeId: '67ff3251a73bf8253bab8772',
            title: 'Task 3: Write an Opinion Essay',
            content: 'Write an essay expressing your opinion on the topic provided.',
        },
    ],
}

function WritingPractice() {
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

    const handleOnExpire = () => {
        alert('Time is up!')
        handleSubmit()
    }

    const handleSubmit = () => {
        const enrichedAnswers = Object.entries(answer).map(([questionId, text]) => {
            const question = writingExam.sections.find((section) => section.questionId === questionId)
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
                <div className={cx('header')}>
                    <h1 className={cx('title')}>{writingExam.title}</h1>
                    <p className={cx('description')}>{writingExam.description}</p>
                    <div className={cx('actions')}>
                        <Button blue border5 onClick={() => window.history.back()}>
                            Back
                        </Button>
                        <div className={cx('countdown')}>
                            <span>Time left:</span>
                            <CountdownTimer
                                key={timerKey}
                                initialTime={30 * 60}
                                onExpire={handleOnExpire}
                                isPaused={isPaused}
                            />
                        </div>
                        <Button blue border5 type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </div>
                <div className={cx('content')}>
                    {writingExam.sections.map((section, index) => (
                        <div key={section.questionId} className={cx('question-wrapper')}>
                            <div className={cx('question')}>
                                <h3 className={cx('task-title')}>
                                    Task {index + 1}: {section.title}
                                </h3>
                                <p className={cx('task-content')}>{section.content}</p>
                            </div>
                            <div className={cx('answer')}>
                                <Writing name={section.questionId} onChange={handleChange} className={cx('textarea')} />
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

export default WritingPractice
