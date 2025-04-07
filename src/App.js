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
import { routes } from './routes/route'
import CourseDetail from './pages/CourseDetail/CourseDetail'
import Study from './pages/Study/Study'

function App() {
    const { user } = useContext(AuthContext)
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path={routes.home} element={<Home />} />
                    <Route path={routes.myAccount} element={user ? <MyAccount /> : <Navigate to="/" />} />
                    <Route path={routes.myCourse} element={user ? <MyCourse /> : <Navigate to="/" />} />
                    <Route path={routes.changePassword} element={user ? <ChangePassword /> : <Navigate to="/" />} />
                    <Route
                        path={`${routes.study}/:courseName/:lessonName`}
                        element={user ? <Study /> : <Navigate to="/" />}
                    />

                    <Route path={routes.course} element={<Course />} />
                    <Route path={`${routes.course}/:courseName`} element={<CourseDetail />} />
                    <Route path="/:courseName/:lessonName" element={<Lesson />} />
                    <Route path={`${routes.quizze}/:quizzeSlug`} element={<Quizze />} />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
