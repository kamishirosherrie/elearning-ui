import React, { useEffect, useState } from 'react'
import styles from './Blog.module.scss'
import classNames from 'classnames/bind'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import BlogForm from '../../components/Blog/BlogForm'
import BlogItem from '../../components/Blog/BlogItem'
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'

const cx = classNames.bind(styles)

function Blog() {
    const [blogs, setBlogs] = useState([])
    const breadcrumbs = useBreadcrumbs()

    useEffect(() => {
        const fetchBlogs = async () => {
            const mockBlogs = [
                {
                    id: 1,
                    title: 'Learn Vocabulary Fast!',
                    description: 'Try out these memory techniques to boost your vocab.',
                    image: '/images/blog1.jpg',
                    date: '2023-10-01',
                    likes: 0,
                    comments: [],
                },
                {
                    id: 2,
                    title: 'Listening Tips for TOEIC',
                    description: 'Focus, predict, and practice with purpose.',
                    image: '/images/blog2.jpg',
                    date: '2023-09-28',
                    likes: 2,
                    comments: [],
                },
            ]
            setBlogs(mockBlogs)
        }

        fetchBlogs()
    }, [])

    const addBlog = (blogData) => {
        const newBlog = {
            ...blogData,
            id: blogs.length + 1,
            date: new Date().toISOString().split('T')[0],
            likes: 0,
            comments: [],
        }
        setBlogs([newBlog, ...blogs])
    }

    const addComment = (blogId, commentText) => {
        setBlogs((prev) =>
            prev.map((blog) =>
                blog.id === blogId
                    ? {
                          ...blog,
                          comments: [...blog.comments, { text: commentText, date: new Date().toLocaleString() }],
                      }
                    : blog,
            ),
        )
    }

    const toggleLike = (blogId) => {
        setBlogs((prev) =>
            prev.map((blog) =>
                blog.id === blogId ? { ...blog, likes: blog.likes > 0 ? blog.likes - 1 : blog.likes + 1 } : blog,
            ),
        )
    }

    return (
        <MainLayout title="Blog">
            <Breadcrumbs items={breadcrumbs} />
            <div className={cx('wrapper')}>
                <h1 className={cx('title')}>Student Blog</h1>
                <BlogForm onAddBlog={addBlog} />
                <div className={cx('blog-list')}>
                    {blogs.map((blog) => (
                        <BlogItem
                            key={blog.id}
                            blog={blog}
                            onLike={() => toggleLike(blog.id)}
                            onComment={(text) => addComment(blog.id, text)}
                        />
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}

export default Blog
