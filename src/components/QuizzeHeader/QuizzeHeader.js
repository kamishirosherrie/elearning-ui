import { toast } from 'react-toastify'
import { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './QuizzeHeader.module.scss'
import Button from '../Button/Button'
import CountdownTimer from '../CountdownTimer/CountdownTimer'
import ModalPopup from '../ModalPopup/ModalPopup'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../routes/route'
import { useLoading } from '../../context/LoadingContext'

const cx = classNames.bind(styles)

const QuizzeHeader = ({ title, description, time, handleSubmit }) => {
    const navigate = useNavigate()
    const { setIsLoading } = useLoading()
    const [isOpen, setIsOpen] = useState(false)

    const handleOnExpire = () => {
        toast.error('Time is up!')
        handleSubmit()
    }
    const handleClick = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleClickSubmit = async () => {
        try {
            setIsOpen(false)
            setIsLoading(true)
            const newSubmission = await handleSubmit()
            toast.success('Submit successfully!')
            navigate(routes.mySubmission, {
                state: {
                    refresh: true,
                    newSubmissionId: newSubmission.quizzeId,
                },
            })
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Submit failed!')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cx('header')}>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className={cx('action')}>
                <Button blue border5 onClick={() => window.history.back()}>
                    Back
                </Button>
                {Number(time) > 0 && (
                    <div className={cx('count')}>
                        Time left:
                        <CountdownTimer initialTime={Number(time) * 60} onExpire={handleOnExpire} />
                    </div>
                )}
                <Button blue border5 type="submit" onClick={handleClick}>
                    Submit
                </Button>
            </div>
            <ModalPopup isOpen={isOpen} closeModal={handleClose} hiddenCloseButton>
                <div className={cx('modal')}>
                    <h2>Are you sure you want to submit?</h2>
                    <p>Once submitted, you will not be able to change your answers.</p>
                    <div className={cx('actions')}>
                        <Button blue border5 onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button blue border5 onClick={handleClickSubmit}>
                            Submit
                        </Button>
                    </div>
                </div>
            </ModalPopup>
        </div>
    )
}

export default QuizzeHeader
