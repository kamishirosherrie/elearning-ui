import { LoginSocialFacebook } from 'reactjs-social-login'
import { env } from '../../../config/environment'
import { getFacebookUserInfo } from '../../../api/socialAuthApi'
import { socialLogin } from '../../../api/authApi'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../../context/AuthContext'
import { routes } from '../../../routes/route'
import { toast } from 'react-toastify'

function FacebookLogin({ redirect = true }) {
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const handleResolve = async (data) => {
        try {
            const userInfo = await getFacebookUserInfo(data.accessToken)
            const response = await socialLogin({ email: userInfo.email, fullName: userInfo.name })
            login({ ...response.user })
            localStorage.setItem('accessToken', response.accessToken)
            toast.success('Đăng nhập thành công')
            if (redirect) navigate(routes.myAccount)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Đăng nhập không thành công')
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
