import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './CommentSection.module.scss'
import Button from '../Button/Button'

const cx = classNames.bind(styles)

function CommentSection({ comments, onComment }) {
    const [commentText, setCommentText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (commentText.trim()) {
            onComment(commentText)
            setCommentText('')
        }
    }

    return (
        <div className={cx('comment-section')}>
            <div className={cx('comment-list')}>
                {comments.map((comment, index) => (
                    <div key={index} className={cx('comment-item')}>
                        <div className={cx('comment-text')}>{comment.text}</div>
                        <div className={cx('comment-date')}>{comment.date}</div>
                    </div>
                ))}
            </div>
            <form className={cx('comment-form')} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <Button type="submit">Post</Button>
            </form>
        </div>
    )
}

export default CommentSection
