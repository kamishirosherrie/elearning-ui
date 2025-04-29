import classNames from 'classnames/bind'
import styles from './BlogItem.module.scss'
import CommentSection from './CommentSection'
import { Heart } from 'lucide-react'
import Button from '../Button/Button'

const cx = classNames.bind(styles)

function BlogItem({ blog, onLike, onComment }) {
    return (
        <div className={cx('blog-item')}>
            <img src={blog.image} alt={blog.title} className={cx('blog-image')} />
            <div className={cx('blog-content')}>
                <h2>{blog.title}</h2>
                <p>{blog.description}</p>
                <div className={cx('blog-footer')}>
                    <span>{blog.date}</span>
                    <Button className={cx('like-btn')} onClick={onLike} leftIcon={<Heart size={16} />}>
                        {blog.likes}
                    </Button>
                </div>
                <CommentSection comments={blog.comments} onComment={onComment} />
            </div>
        </div>
    )
}

export default BlogItem
