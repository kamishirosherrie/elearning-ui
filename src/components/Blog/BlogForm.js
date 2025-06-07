import { useState, useRef, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './BlogForm.module.scss'
import JoditEditor from 'jodit-react'
import Button from '../Button/Button'

const cx = classNames.bind(styles)

function BlogForm({ onAddBlog, initialData, isEdit, onCancel }) {
    const [form, setForm] = useState({ title: '', content: '' })
    const editor = useRef(null)

    useEffect(() => {
        if (initialData) {
            setForm({ _id: initialData._id, title: initialData.title, content: initialData.content })
        }
    }, [initialData])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.title || !form.content) return
        console.log('Form submitted:', form)

        if (isEdit && initialData) {
            onAddBlog({ ...initialData, ...form })
        } else {
            onAddBlog(form)
        }
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
            <div className={cx('button-group')}>
                <Button className={cx('button')} type="submit" disabled={!form.title || !form.content}>
                    {isEdit ? 'Update' : 'Post'}
                </Button>
                {isEdit && (
                    <Button className={cx('button', 'cancel')} type="button" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    )
}

export default BlogForm
