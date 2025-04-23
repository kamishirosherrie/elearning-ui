import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home/Home'
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
import ForgotPassWord from './pages/ForgotPassWord/ForgotPassWord'
import ResetPassWord from './pages/ResetPassWord/ResetPassWord'
import MySubmission from './pages/UserDashboard/MySubmission/MySubmission'
import QuizzeView from './pages/Quizze/QuizzeView'
import { SubmissionProvider } from './context/SubmissionContext'
import EntryTest from './pages/EntryTest/EntryTest'
import TestPractice from './pages/UserDashboard/TestPractice/TestPractice'
import Ranking from './pages/Ranking/Ranking'
import WritingPractice from './pages/TestPractice/WritingPractice/WritingPractice'
import ListeningPractice from './pages/TestPractice/ListeningPractice/ListeningPractice'
import ReadingPractice from './pages/TestPractice/ReadingPractice/ReadingPractice'
import SpeakingPractice from './pages/TestPractice/SpeakingPractice/SpeakingPractice'
import { LoadingProvider } from './context/LoadingContext'

function App() {
    const { user } = useContext(AuthContext)
    return (
        <LoadingProvider>
            <SubmissionProvider>
                <div className="App">
                    <Router>
                        <Routes>
                            <Route path={routes.home} element={<Home />} />
                            <Route path={routes.myAccount} element={user ? <MyAccount /> : <Navigate to="/" />} />
                            <Route path={routes.myCourse} element={user ? <MyCourse /> : <Navigate to="/" />} />
                            <Route path={routes.mySubmission} element={user ? <MySubmission /> : <Navigate to="/" />} />
                            <Route
                                path={routes.changePassword}
                                element={user ? <ChangePassword /> : <Navigate to="/" />}
                            />
                            <Route
                                path={`${routes.study}/:courseName/:lessonName`}
                                element={user ? <Study /> : <Navigate to="/" />}
                            />
                            <Route
                                path={`${routes.quizzeView}/:quizzeSlug`}
                                element={user ? <QuizzeView /> : <Navigate to="/" />}
                            />
                            <Route
                                path={`${routes.quizze}/:quizzeSlug`}
                                element={user ? <Quizze /> : <Navigate to="/" />}
                            />
                            <Route path={routes.testPractice} element={user ? <TestPractice /> : <Navigate to="/" />} />

                            <Route
                                path={`${routes.listeningPractice}/:quizzeSlug`}
                                element={user ? <ListeningPractice /> : <Navigate to="/" />}
                            />
                            <Route
                                path={`${routes.readingPractice}/:quizzeSlug`}
                                element={user ? <ReadingPractice /> : <Navigate to="/" />}
                            />
                            <Route
                                path={`${routes.speakingPractice}/:quizzeSlug`}
                                element={user ? <SpeakingPractice /> : <Navigate to="/" />}
                            />
                            <Route
                                path={`${routes.writingPractice}/:quizzeSlug`}
                                element={user ? <WritingPractice /> : <Navigate to="/" />}
                            />

                            <Route path={routes.forgotPassword} element={<ForgotPassWord />} />
                            <Route path={routes.resetPassword} element={<ResetPassWord />} />

                            <Route path={routes.course} element={<Course />} />
                            <Route path={`${routes.course}/:courseName`} element={<CourseDetail />} />
                            <Route path={routes.entryTest} element={<EntryTest />} />
                            <Route path={routes.ranking} element={<Ranking />} />

                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                        <ToastContainer
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={true}
                            closeOnClick
                            pauseOnHover
                            draggable
                            style={{ top: '90px' }}
                        />
                    </Router>
                </div>
            </SubmissionProvider>
        </LoadingProvider>
    )
}

export default App
