import classNames from 'classnames/bind'
import styles from './MySubmission.module.scss'
import MainAccount from '../../../layouts/MainAccount/MainAccount'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../context/AuthContext'
import { getAllSubmissionsByUserId } from '../../../api/submissionApi'
import { useLocation, useNavigate } from 'react-router-dom'
import { routes } from '../../../routes/route'
import SubmissionContext from '../../../context/SubmissionContext'
import Button from '../../../components/Button/Button'
import { useLoading } from '../../../context/LoadingContext'

const cx = classNames.bind(styles)

function MySubmission() {
    const { user } = useContext(AuthContext)
    const { setInfo } = useContext(SubmissionContext)
    const navigate = useNavigate()
    const location = useLocation()
    const { setIsLoading } = useLoading()

    const [submissions, setSubmissions] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const handleClick = (quizzeSlug, submissionId) => {
        navigate(`${routes.quizzeView}/${quizzeSlug}`)
        setInfo({ submissionId })
    }

    useEffect(() => {
        const getSubmissions = async () => {
            try {
                setIsLoading(true)
                const response = await getAllSubmissionsByUserId(user._id, currentPage, 10)
                console.log(response)
                setSubmissions(response.submissions)
                setTotalPages(response.totalPages)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        getSubmissions()
    }, [user._id, currentPage, setIsLoading])

    useEffect(() => {
        if (location.state?.newSubmissionId && submissions.length > 0) {
            const newSubmissionElement = document.getElementById(location.state.newSubmissionId)
            if (newSubmissionElement) {
                newSubmissionElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
                newSubmissionElement.classList.add('highlight')
            }
        }
    }, [submissions, location.state])

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
                            <tr
                                key={submission._id}
                                id={submission._id}
                                onClick={() => handleClick(submission.quizzeId?.slug, submission._id)}
                            >
                                <td>{(currentPage - 1) * 10 + index + 1}</td>
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
            <div className={cx('pagination')}>
                <Button pagination disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
                    Previous
                </Button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <Button
                        key={page}
                        pagination
                        className={page === currentPage ? 'active' : ''}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </Button>
                ))}

                <Button
                    pagination
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Next
                </Button>
            </div>
        </MainAccount>
    )
}

export default MySubmission
