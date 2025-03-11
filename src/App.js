import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import AddLesson from './pages/Admin/Lesson/AddLesson'
import Lesson from './pages/Lesson/Lesson'
import Course from './pages/Courses/Course'
import Quizze from './pages/Quizze/Quizze'
import AuthContext from './context/AuthContext'
import { useContext } from 'react'
import MyAccount from './pages/UserDashboard/MyAccount/MyAccount'

function App() {
    const { user } = useContext(AuthContext)
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/my-account" element={user ? <MyAccount /> : <Navigate to="/" />} />
                    <Route path="/course/:courseName" element={<Course />} />
                    <Route path="/:courseName/:lessonName" element={<Lesson />} />
                    <Route path="/lesson/quizze/:quizzeSlug" element={<Quizze />} />
                    <Route path="/admin/lesson/add-lesson" element={<AddLesson />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
