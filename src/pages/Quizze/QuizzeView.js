import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './QuizzeView.module.scss'

import { getQuizzeBySlug } from '../../api/quizzeApi'
import { getQuestionByQuizzeSlug } from '../../api/questionApi'
import { getSubmissionById } from '../../api/submissionApi'
import AuthContext from '../../context/AuthContext'
import SubmissionContext from '../../context/SubmissionContext'
import MainLayout from '../../layouts/MainLayout/MainLayout'

const cx = classNames.bind(styles)

const calculateStats = (userAnswer, questions) => {
    if (!userAnswer || !questions?.length) return null

    const totalQuestions = questions.length
    const answered = userAnswer.answers.filter((ans) => ans.text && ans.text.trim() !== '')
    const answeredCount = answered.length
    const correctCount = answered.filter((ans) => ans.isCorrect).length
    const incorrectCount = answeredCount - correctCount
    const accuracy = ((correctCount / totalQuestions) * 100).toFixed(1)
    const totalScore = userAnswer.score ?? correctCount

    return {
        totalQuestions,
        answeredCount,
        correctCount,
        incorrectCount,
        accuracy,
        totalScore,
    }
}

function QuizzeView() {
    const { user } = useContext(AuthContext)
    const { info } = useContext(SubmissionContext)
    const { quizzeSlug } = useParams()

    const [quizze, setQuizze] = useState({})
    const [questions, setQuestions] = useState([])
    const [userAnswer, setUserAnswer] = useState({})
    const [stats, setStats] = useState(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const quizzeData = await getQuizzeBySlug(quizzeSlug)
                const questionData = await getQuestionByQuizzeSlug(quizzeSlug)
                const userAnswersData = await getSubmissionById(info.submissionId)
                console.log('User answers data: ', userAnswersData)
                setQuizze(quizzeData)
                setQuestions(questionData.questions)
                setUserAnswer(userAnswersData)

                const computedStats = calculateStats(userAnswersData, questionData.questions)
                setStats(computedStats)
            } catch (error) {
                console.log('Get submission failed: ', error)
            }
        }

        getData()
    }, [user._id, quizzeSlug, info.submissionId])

    return (
        <MainLayout>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h1 className={cx('title')}>{quizze.title}</h1>
                    <p className={cx('description')}>{quizze.description}</p>
                </div>

                <div className={cx('summary')}>
                    <h2 className={cx('title')}>📊 Your Result Summary</h2>
                    {!stats ? (
                        <p>Loading result...</p>
                    ) : (
                        <>
                            <p>Total questions: {stats.totalQuestions}</p>
                            <p>Total score: {stats.totalScore}</p>
                            <p>
                                Answered: {stats.answeredCount} / {stats.totalQuestions}
                            </p>
                            <p>✅ Correct: {stats.correctCount}</p>
                            <p>❌ Incorrect: {stats.incorrectCount}</p>
                            <p>🎯 Accuracy: {stats.accuracy}%</p>
                        </>
                    )}
                </div>

                {questions?.map((question, indexQuestion) => {
                    const currentUserAnswer = userAnswer?.answers?.find((ans) => ans.questionId === question._id)

                    return (
                        <div className={cx('questions')} key={indexQuestion}>
                            <div className={cx('header')}>
                                <span className={cx('title')}>Question {indexQuestion + 1}: </span>
                                <span>{question.question}</span>
                            </div>

                            <div className={cx('answer-item')}>
                                {question.answer?.map((answer, indexAnswer) => (
                                    <div
                                        key={indexAnswer}
                                        className={cx('answer', {
                                            correct: answer.isCorrect,
                                        })}
                                    >
                                        {answer.text}
                                    </div>
                                ))}
                            </div>

                            <div className={cx('user-answer')}>
                                <div className={cx('title')}>Your answer: </div>
                                <div
                                    className={cx('answer', {
                                        correct: currentUserAnswer?.isCorrect,
                                        incorrect: !currentUserAnswer?.isCorrect,
                                    })}
                                >
                                    {currentUserAnswer?.text || 'No answer submitted.'}
                                </div>
                            </div>

                            {currentUserAnswer?.aiFeedback && (
                                <div className={cx('explanation')}>
                                    <div className={cx('title')}>Explanation: </div>
                                    <div className={cx('answer')}>{currentUserAnswer.aiFeedback}</div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </MainLayout>
    )
}

export default QuizzeView
