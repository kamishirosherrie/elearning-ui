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

function BlogItem({ blog }) {
    const { user } = useContext(AuthContext)
    const [isLike, setIsLike] = useState(false)
    const [totalLike, setTotalLike] = useState(0)

    const handleLike = async () => {
        if (user) {
            try {
                const response = await likePost(blog._id)
                console.log(response)
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
        const fetchTotalLike = async () => {
            try {
                const response = await getTotalLikeByPostId(blog._id)
                console.log('Total like: ', response)

                setTotalLike(response.totalLike)
            } catch (error) {
                console.log('Get total like failed: ', error)
            }
        }
        fetchTotalLike()
    }, [blog._id])

    return (
        <div className={cx('blog-item')}>
            <div className={cx('blog-content')}>
                <h2>{blog?.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: blog?.content }}></div>
                <div className={cx('blog-footer')}>
                    <span>{dayjs(blog?.createdAt).fromNow()}</span>
                    <Button className={cx('like-btn')} onClick={handleLike} leftIcon={<Heart size={16} />}>
                        {totalLike}
                    </Button>
                </div>
                <CommentSection postId={blog?._id} />
            </div>
        </div>
    )
}

export default BlogItem
