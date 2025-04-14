import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './QuizzeView.module.scss'

import StudyZone from '../../layouts/StudyZone/StudyZone'
import { getQuizzeBySlug } from '../../api/quizzeApi'
import { getQuestionByQuizzeSlug } from '../../api/questionApi'
import { getSubmissionById } from '../../api/submissionApi'
import AuthContext from '../../context/AuthContext'
import SubmissionContext from '../../context/SubmissionContext'

const cx = classNames.bind(styles)

function QuizzeView() {
    const { user } = useContext(AuthContext)
    const { info } = useContext(SubmissionContext)
    const { quizzeSlug } = useParams()

    const [quizze, setQuizze] = useState({})
    const [questions, setQuestions] = useState([])
    const [userAnswers, setUserAnswers] = useState({ answers: [] })

    useEffect(() => {
        const getData = async () => {
            try {
                const quizzeData = await getQuizzeBySlug(quizzeSlug)
                const questionData = await getQuestionByQuizzeSlug(quizzeSlug)
                setQuizze(quizzeData)
                setQuestions(questionData)

                const userAnswersData = await getSubmissionById(info.submissionId)

                setUserAnswers(userAnswersData)
            } catch (error) {
                console.log('Get submission failed: ', error)
            }
        }

        getData()
    }, [user._id, quizzeSlug])

    return (
        <StudyZone>
            <div className={cx('quizze-view')}>
                <h1 className={cx('title')}>{quizze.title}</h1>
                <p className={cx('description')}>{quizze.description}</p>
                <div className={cx('questions')}>
                    {questions.map((question, index) => {
                        const userAnswer = userAnswers.answers?.find((ans) => ans.questionId === question._id)
                        console.log(userAnswers)

                        const incorrect = userAnswer && !userAnswer.isCorrect
                        return (
                            <div key={question._id} className={cx('question')}>
                                <h3>Question {index + 1}</h3>
                                <p>{question.question}</p>
                                <div className={cx('answers')}>
                                    {question.answer.map((answer, idx) => {
                                        const answerClass = cx('answer', { correct: answer.isCorrect, incorrect })
                                        return (
                                            <div key={idx} className={answerClass}>
                                                <span>{answer.text}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </StudyZone>
    )
}

export default QuizzeView
