import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import Modal from 'react-modal'

import classNames from 'classnames/bind'
import styles from './Login.module.scss'
import { loginUser } from '../../api/authApi'

const cx = classNames.bind(styles)
Modal.setAppElement('#root')

const Login = ({ isOpen, closeModal }) => {
    const [user, setUser] = useState({})
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            if (user.userName && user.passWord) {
                const response = await loginUser(user)
                login({ ...response })
                navigate('/student/my-account')
            } else {
                alert('Please enter username and password')
            }
            console.log(user)
        } catch (error) {
            console.log('Login failed: ', error.message)
        }
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Login">
            <div className={cx('login-form')}>
                <h2>Đăng Nhập</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" id="userName" name="userName" placeholder="Username" onChange={handleChange} />
                    <input
                        type="password"
                        id="passWord"
                        name="passWord"
                        placeholder="Mật khẩu"
                        onChange={handleChange}
                    />
                    <button type="submit">Đăng nhập</button>
                </form>
            </div>
        </Modal>
    )
}

export default Login
