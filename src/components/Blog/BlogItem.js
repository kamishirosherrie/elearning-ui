import classNames from 'classnames/bind'
import styles from './BlogItem.module.scss'
import CommentSection from './CommentSection'
import { Heart } from 'lucide-react'
import Button from '../Button/Button'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import { getTotalLikeByPostId, likePost } from '../../api/postApi'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'
import { toast } from 'react-toastify'

dayjs.extend(relativeTime)
dayjs.locale('vi')
const cx = classNames.bind(styles)

function BlogItem({ blog, isLiked, onEdit }) {
    const { user } = useContext(AuthContext)
    const [isLike, setIsLike] = useState(isLiked)
    const [totalLike, setTotalLike] = useState(0)
    const [more, setMore] = useState(false)

    const minLengthContent = 500

    const handleLike = async () => {
        if (user) {
            try {
                await likePost(blog._id)
                setTotalLike((prev) => prev + (isLike ? -1 : 1))
                setIsLike((prev) => !prev)
            } catch (error) {
                console.log('Like post failed: ', error)
            }
        } else {
            toast.error('Vui lòng đăng nhập để tiếp tục!')
        }
    }

    useEffect(() => {
        setIsLike(isLiked)
    }, [isLiked])

    useEffect(() => {
        const fetchTotalLike = async () => {
            try {
                if (blog?._id) {
                    const response = await getTotalLikeByPostId(blog._id)
                    setTotalLike(typeof response.totalLike === 'number' ? response.totalLike : 0)
                }
            } catch (error) {
                setTotalLike(0)
                console.log('Get total like failed: ', error)
            }
        }
        fetchTotalLike()
    }, [blog._id])

    return (
        <div className={cx('blog-item')}>
            <div className={cx('blog-content')}>
                <div className={cx('author')}>{blog?.authorName}</div>
                <h2>{blog?.title}</h2>
                {!more && blog?.content.length > minLengthContent ? (
                    <div>
                        <div dangerouslySetInnerHTML={{ __html: blog?.content.slice(0, minLengthContent) }} />
                        <span className={cx('more-text')}>...</span>
                    </div>
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
                )}
                <span className={cx('more-btn')} onClick={() => setMore((prev) => !prev)}>
                    {more ? 'Ẩn bớt' : 'Xem thêm'}
                </span>
                <div className={cx('blog-footer')}>
                    <span>{dayjs(blog?.createdAt).fromNow()}</span>
                    <Button
                        className={cx('like-btn', { liked: isLike })}
                        onClick={handleLike}
                        leftIcon={<Heart size={16} />}
                    >
                        {typeof totalLike === 'number' ? totalLike : 0}
                    </Button>
                    {user && user._id === blog?.authorId && onEdit && (
                        <Button
                            className={cx('edit-btn')}
                            type="button"
                            onClick={() => onEdit(blog)}
                            style={{ marginLeft: 8 }}
                        >
                            Edit
                        </Button>
                    )}
                </div>
                <CommentSection postId={blog?._id} />
            </div>
        </div>
    )
}

export default BlogItem
