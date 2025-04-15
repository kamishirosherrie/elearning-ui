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
    const [userAnswer, setUserAnswer] = useState({})

    useEffect(() => {
        const getData = async () => {
            try {
                const quizzeData = await getQuizzeBySlug(quizzeSlug)
                const questionData = await getQuestionByQuizzeSlug(quizzeSlug)
                setQuizze(quizzeData)
                setQuestions(questionData)

                const userAnswersData = await getSubmissionById(info.submissionId)

                setUserAnswer(userAnswersData)
            } catch (error) {
                console.log('Get submission failed: ', error)
            }
        }

        getData()
    }, [user._id, quizzeSlug, info.submissionId])

    return (
        <StudyZone>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h1 className={cx('title')}>{quizze.title}</h1>
                    <p className={cx('description')}>{quizze.description}</p>
                </div>
                <div className={cx('questions')}>
                    {questions.map((question, index) => {
                        const userAnswerForQuestion = userAnswer.answers?.find((ans) => ans.questionId === question._id)

                        return (
                            <div key={question._id} className={cx('question')}>
                                <h4>Question {index + 1}</h4>
                                <p>{question.question}</p>
                                <div className={cx('answers')}>
                                    {question.answer.map((ans, idx) => {
                                        const isUserAnswer = userAnswerForQuestion?.text === ans.text
                                        const isCorrectUserAnswer = userAnswerForQuestion?.isCorrect
                                        const answerClass = cx('answer', {
                                            correct: ans.isCorrect || (isUserAnswer && isCorrectUserAnswer),
                                            incorrect: isUserAnswer && !isCorrectUserAnswer,
                                        })

                                        return (
                                            <div key={idx} className={answerClass}>
                                                <span>{ans.text}</span>
                                            </div>
                                        )
                                    })}
                                    {userAnswerForQuestion &&
                                        !question.answer.some((ans) => ans.text === userAnswerForQuestion.text) && (
                                            <div
                                                className={cx('answer', {
                                                    incorrect: !userAnswerForQuestion.isCorrect,
                                                })}
                                            >
                                                <span>{userAnswerForQuestion.text}</span>
                                            </div>
                                        )}
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
