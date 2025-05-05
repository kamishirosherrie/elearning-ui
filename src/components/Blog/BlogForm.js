import { useState, useRef } from 'react'
import classNames from 'classnames/bind'
import styles from './BlogForm.module.scss'
import JoditEditor from 'jodit-react'
import Button from '../Button/Button'

const cx = classNames.bind(styles)

function BlogForm({ onAddBlog }) {
    const [form, setForm] = useState({ title: '', content: '' })
    const editor = useRef(null)

    const handleSubmit = (e) => {
        if (!form.title || !form.content) return
        e.preventDefault()
        onAddBlog(form)
        setForm({ title: '', content: '' })
    }

    return (
        <form className={cx('blog-form')} onSubmit={handleSubmit}>
            <input
                name="title"
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            />
            <JoditEditor
                ref={editor}
                value={form.content}
                name="content"
                onChange={(text) => setForm((prev) => ({ ...prev, content: text }))}
            />
            <Button className={cx('button')} type="submit" disabled={!form.title || !form.content}>
                Post
            </Button>
        </form>
    )
}

export default BlogForm
