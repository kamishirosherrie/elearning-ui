import { useContext } from 'react'
import { LoginSocialGoogle } from 'reactjs-social-login'
import AuthContext from '../../../context/AuthContext'
import { socialLogin } from '../../../api/authApi'
import { useNavigate } from 'react-router-dom'

import { routes } from '../../../routes/route'
import { getGoogleUserInfo } from '../../../api/socialAuthApi'
import { env } from '../../../config/environment'

function GoogleLogin({ redirect }) {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleResolve = async (data) => {
        try {
            const userInfo = await getGoogleUserInfo(data.access_token)
            console.log(userInfo)
            const response = await socialLogin({ email: userInfo.email, fullName: userInfo.name })
            if (response) {
                login({ userName: userInfo.email, email: userInfo.email, fullName: userInfo.name })
                if (redirect) navigate(routes.myAccount)
            } else {
                alert('Đăng nhập không thành công')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <LoginSocialGoogle
            isOnlyGetToken
            client_id={env.googleClientId}
            scope="profile email"
            onResolve={({ data }) => handleResolve(data)}
            onReject={(err) => {
                console.log(err)
            }}
        >
            Google
        </LoginSocialGoogle>
    )
}

export default GoogleLogin
