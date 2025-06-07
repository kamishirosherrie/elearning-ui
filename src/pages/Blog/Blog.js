import React, { useContext, useEffect, useState } from 'react'
import styles from './Blog.module.scss'
import classNames from 'classnames/bind'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import BlogForm from '../../components/Blog/BlogForm'
import BlogItem from '../../components/Blog/BlogItem'
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { createPost, getAllPosts, updatePost } from '../../api/postApi'
import AuthContext from '../../context/AuthContext'
import { toast } from 'react-toastify'
import ModalPopup from '../../components/ModalPopup/ModalPopup'
import { useLoading } from '../../context/LoadingContext'

const cx = classNames.bind(styles)

function Blog() {
    const { setIsLoading } = useLoading()
    const { user } = useContext(AuthContext)
    const breadcrumbs = useBreadcrumbs()

    const [blogs, setBlogs] = useState([])
    const [editingBlog, setEditingBlog] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
        setEditingBlog(null)
    }

    const addBlog = async (blogData) => {
        const newBlog = {
            ...blogData,
            authorId: user._id,
        }
        setBlogs([newBlog, ...blogs])

        try {
            const response = await createPost(blogData)
            setBlogs((prev) => [response.posts, ...prev])
        } catch (error) {
            console.log('Create blog failed: ', error)
        }
    }

    const handleEdit = (blog) => {
        setEditingBlog(blog)
        setIsOpen(true)
    }

    const handleUpdateBlog = async (updatedBlog) => {
        try {
            setIsLoading(true)
            const response = await updatePost(updatedBlog._id, updatedBlog)
            setBlogs((prev) =>
                prev.map((blog) => (blog._id === updatedBlog._id ? { ...blog, ...response.post } : blog)),
            )
            setEditingBlog(null)
            setIsOpen(false)
            toast.success('Cập nhật bài viết thành công!')
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Update blog failed')
            console.log('Update blog failed: ', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const blogs = await getAllPosts()
                setBlogs(blogs.posts)
            } catch (error) {
                console.log('Get blogs failed: ', error)
            }
        }
        getBlogs()
    }, [])

    return (
        <MainLayout title="Blog">
            <Breadcrumbs items={breadcrumbs} />
            <div className={cx('wrapper')}>
                <div className={cx('form')}>
                    {user && (
                        <input
                            type="text"
                            className={cx('form-input')}
                            placeholder={`Xin chào ${user?.fullName}, hãy chia sẻ bài viết của bạn`}
                            onClick={() => {
                                setIsOpen(true)
                                setEditingBlog(null)
                            }}
                        />
                    )}
                </div>
                <ModalPopup isOpen={isOpen} closeModal={closeModal}>
                    {user && !editingBlog && <BlogForm onAddBlog={addBlog} />}
                    {user && editingBlog && (
                        <BlogForm onAddBlog={handleUpdateBlog} initialData={editingBlog} isEdit onCancel={closeModal} />
                    )}
                </ModalPopup>
                <div className={cx('blog-list')}>
                    {blogs?.map((blog) => (
                        <BlogItem
                            key={blog._id}
                            blog={blog}
                            isLiked={blog?.likes?.includes(user?._id)}
                            onEdit={() => handleEdit(blog)}
                        />
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}

export default Blog
