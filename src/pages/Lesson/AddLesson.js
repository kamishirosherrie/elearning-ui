import { useState } from 'react'
import axios from 'axios'

function AddLesson() {
    const [lesson, setLesson] = useState({
        title: '',
        videoUrl: '',
        content: '',
        courseName: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setLesson({ ...lesson, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Lesson data:', lesson)
        try {
            const res = await axios.post('http://localhost:8017/lesson/addNewLesson', lesson)
            console.log('Response:', res)
        } catch (error) {
            console.log('Error:', error)
        }
    }

    return (
        <div>
            <h2>Thêm bài học</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Tiêu đề" value={lesson.title} onChange={handleChange} required />
                <input type="text" name="videoUrl" placeholder="URL Video" value={lesson.videoUrl} onChange={handleChange} />
                <input type="text" name="courseName" placeholder="Tên Khóa học" value={lesson.courseName} onChange={handleChange} required />

                <h3>Nội dung bài học</h3>
                <textarea name="content" value={lesson.content} onChange={handleChange} required></textarea>
                <button type="submit">Lưu bài học</button>
            </form>
        </div>
    )
}

export default AddLesson
