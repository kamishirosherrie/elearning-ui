import React, { useContext, useEffect, useState } from 'react'
import styles from './Blog.module.scss'
import classNames from 'classnames/bind'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import BlogForm from '../../components/Blog/BlogForm'
import BlogItem from '../../components/Blog/BlogItem'
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { createPost, getAllPosts } from '../../api/postApi'
import AuthContext from '../../context/AuthContext'

const cx = classNames.bind(styles)

function Blog() {
    const { user } = useContext(AuthContext)
    const breadcrumbs = useBreadcrumbs()

    const [blogs, setBlogs] = useState([])

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

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const blogs = await getAllPosts()
                console.log(blogs)
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
                {user && <BlogForm onAddBlog={addBlog} />}
                <div className={cx('blog-list')}>
                    {blogs?.map((blog) => (
                        <BlogItem key={blog + Math.random()} blog={blog} />
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}

export default Blog
