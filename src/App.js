import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import AddLesson from './pages/Admin/Lesson/AddLesson'
import Lesson from './pages/Lesson/Lesson'
import Course from './pages/Courses/Course'
import Quizze from './pages/Quizze/Quizze'

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/course/:courseName" element={<Course />} />
                    <Route path="/:courseName/:lessonName" element={<Lesson />} />
                    <Route path="/lesson/quizze/:lessonName" element={<Quizze />} />
                    <Route path="/admin/lesson/add-lesson" element={<AddLesson />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
