import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Ielts from './pages/Courses/Ielts/Ielts'
import Toeic from './pages/Courses/Toeic/Toeic'
import AddLesson from './pages/Admin/Lesson/AddLesson'

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/ielts" element={<Ielts />} />
                    <Route path="/toeic" element={<Toeic />} />
                    <Route path="/admin/lesson/add-lesson" element={<AddLesson />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
