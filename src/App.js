import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Lesson from './pages/Lesson/Lesson'
import Course from './pages/Courses/Course'
import Quizze from './pages/Quizze/Quizze'
import AuthContext from './context/AuthContext'
import { useContext } from 'react'
import MyAccount from './pages/UserDashboard/MyAccount/MyAccount'
import ChangePassword from './pages/UserDashboard/ChangePassword/ChangePassword'
import MyCourse from './pages/UserDashboard/MyCourse/MyCourse'

function App() {
    const { user } = useContext(AuthContext)
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/student/my-account" element={user ? <MyAccount /> : <Navigate to="/" />} />
                    <Route path="/student/my-course" element={user ? <MyCourse /> : <Navigate to="/" />} />
                    <Route path="/student/change-password" element={user ? <ChangePassword /> : <Navigate to="/" />} />
                    <Route path="/course/:courseName" element={<Course />} />
                    <Route path="/:courseName/:lessonName" element={<Lesson />} />
                    <Route path="/lesson/quizze/:quizzeSlug" element={<Quizze />} />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
