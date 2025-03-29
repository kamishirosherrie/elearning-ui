import { LoginSocialFacebook } from 'reactjs-social-login'
import { env } from '../../../config/environment'
import { getFacebookUserInfo } from '../../../api/socialAuthApi'
import { socialLogin } from '../../../api/authApi'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../../context/AuthContext'
import { routes } from '../../../routes/route'

function FacebookLogin({ redirect }) {
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)
    const handleResolve = async (data) => {
        try {
            const userInfo = await getFacebookUserInfo(data.accessToken)
            console.log(userInfo)
            const response = await socialLogin({ email: userInfo.email, fullName: userInfo.name })
            if (response) {
                login({ userName: userInfo.email, email: userInfo.email, fullName: userInfo.name })
                if (redirect) navigate(routes.myAccount)
            } else {
                alert('Đăng nhập không thành công')
            }
        } catch (error) {
            console.log('Login with Facebook failed: ', error)
        }
    }
    return (
        <LoginSocialFacebook
            isOnlyGetToken
            appId={env.facebookAppId || ''}
            onResolve={({ data }) => handleResolve(data)}
            onReject={(err) => {
                console.log(err)
            }}
        >
            Facebook
        </LoginSocialFacebook>
    )
}

export default FacebookLogin
