import classNames from 'classnames/bind'
import styles from './MySubmission.module.scss'
import MainAccount from '../../../layouts/MainAccount/MainAccount'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../context/AuthContext'
import { getAllSubmissionsByUserId } from '../../../api/submissionApi'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../routes/route'
import SubmissionContext from '../../../context/SubmissionContext'

const cx = classNames.bind(styles)

function MySubmission() {
    const { user } = useContext(AuthContext)
    const { setInfo } = useContext(SubmissionContext)
    const navigate = useNavigate()
    const [submissions, setSubmissions] = useState([])

    const handleClick = (quizzeSlug, submissionId) => {
        navigate(`${routes.quizzeView}/${quizzeSlug}`)
        setInfo({ submissionId })
    }

    useEffect(() => {
        const getSubmissions = async () => {
            try {
                const response = await getAllSubmissionsByUserId(user._id)
                console.log(response)
                setSubmissions(response)
            } catch (error) {
                console.log(error)
            }
        }

        getSubmissions()
    }, [user._id])

    return (
        <MainAccount title="Lịch sử làm bài">
            <div className={cx('list')}>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Bài kiểm tra</th>
                            <th>Bài học</th>
                            <th>Chương</th>
                            <th>Khóa học</th>
                            <th>Điểm</th>
                            <th>Thời gian làm bài</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((submission, index) => (
                            <tr key={index} onClick={() => handleClick(submission.quizzeId?.slug, submission._id)}>
                                <td>{index + 1}</td>
                                <td>{submission.quizzeId?.title}</td>
                                <td>{submission.quizzeId?.lessonId?.title}</td>
                                <td>{submission.quizzeId?.lessonId?.chapterId?.title}</td>
                                <td>{submission.quizzeId?.lessonId?.chapterId?.courseId?.title}</td>
                                <td>{submission.score}</td>
                                <td>{submission.timeTaken}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </MainAccount>
    )
}

export default MySubmission
