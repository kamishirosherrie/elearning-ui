import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }
    return (
        <div className="dashboard">
            <h2>Chào mừng, {user?.email}!</h2>
            <button onClick={handleLogout}>Đăng xuất</button>
        </div>
    )
}

export default Dashboard
