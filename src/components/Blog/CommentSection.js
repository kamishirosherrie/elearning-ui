import React, { useContext, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './CommentSection.module.scss'
import Button from '../Button/Button'
import AuthContext from '../../context/AuthContext'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'
import { createComment, getCommentsByPostId } from '../../api/commentApi'
import { toast } from 'react-toastify'

dayjs.extend(relativeTime)
dayjs.locale('vi')

const cx = classNames.bind(styles)

function CommentSection({ postId }) {
    const { user } = useContext(AuthContext)
    const [comments, setComments] = useState([])
    const [text, setText] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!text.trim()) return

        const newComment = {
            content: text,
            postId,
            userId: {
                _id: user._id,
                fullName: user.fullName,
            },
            createdAt: new Date().toISOString(),
        }
        console.log(newComment)
        setText('')
        setComments((prev) => [newComment, ...prev])
        try {
            const response = await createComment(newComment)
            console.log('commented: ', response)
        } catch (error) {
            console.log('Create comment failed: ', error)
            toast.error(error.response?.data?.message || 'Vui lòng thử lại sau!')
        }
    }

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await getCommentsByPostId(postId)
                console.log(response)

                setComments(response.comments)
            } catch (error) {
                console.log('Get comments by post ID failed: ', error)
            }
        }

        fetchComments()
    }, [postId])

    return (
        <div className={cx('comment-section')}>
            <div className={cx('comment-list')}>
                {comments?.map((comment, index) => (
                    <div key={index} className={cx('comment-item')}>
                        <div className={cx('comment-user')}>{comment.userId?.fullName}</div>
                        <div className={cx('comment-text')}>{comment.content}</div>
                        <div className={cx('comment-date')}>{dayjs(comment.createdAt).fromNow()}</div>
                    </div>
                ))}
            </div>
            <form className={cx('comment-form')} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Viết bình luận..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button type="submit">Post</Button>
            </form>
        </div>
    )
}

export default CommentSection
