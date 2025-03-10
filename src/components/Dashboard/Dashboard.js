import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import Sidebar from '../../layouts/Sidebar/Sidebar'

const Dashboard = () => {
    const { user } = useContext(AuthContext)

    return (
        <div className="dashboard">
            <Sidebar />
            <h2>Chào mừng, {user?.email}!</h2>
        </div>
    )
}

export default Dashboard
