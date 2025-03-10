import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import Modal from 'react-modal'

import classNames from 'classnames/bind'
import styles from './Login.module.scss'

const cx = classNames.bind(styles)
Modal.setAppElement('#root')

const Login = ({ isOpen, closeModal, setIsOpen }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email && password) {
            login({ email, password })
            navigate('/my-account')
            setIsOpen(false)
        } else {
            alert('Vui lòng nhập đầy đủ thông tin!')
        }
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Login">
            <div className="login-form">
                <h2>Đăng Nhập</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Đăng nhập</button>
                </form>
            </div>
        </Modal>
    )
}

export default Login
