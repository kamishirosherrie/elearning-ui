import { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './BlogForm.module.scss'
import Button from '../Button/Button'

const cx = classNames.bind(styles)

function BlogForm({ onAddBlog }) {
    const [form, setForm] = useState({ title: '', description: '', image: '' })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onAddBlog(form)
        setForm({ title: '', description: '', image: '' })
    }

    return (
        <form className={cx('blog-form')} onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
            <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={form.image}
                onChange={handleChange}
                required
            />
            <Button type="submit">Post</Button>
        </form>
    )
}

export default BlogForm
