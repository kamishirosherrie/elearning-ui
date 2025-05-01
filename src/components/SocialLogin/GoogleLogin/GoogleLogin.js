import { useContext } from 'react'
import { LoginSocialGoogle } from 'reactjs-social-login'
import AuthContext from '../../../context/AuthContext'
import { socialLogin } from '../../../api/authApi'
import { useNavigate } from 'react-router-dom'

import { routes } from '../../../routes/route'
import { getGoogleUserInfo } from '../../../api/socialAuthApi'
import { env } from '../../../config/environment'
import { toast } from 'react-toastify'
import { useLoading } from '../../../context/LoadingContext'

function GoogleLogin({ redirect = true }) {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const { setIsLoading } = useLoading()

    const handleResolve = async (data) => {
        try {
            setIsLoading(true)
            const userInfo = await getGoogleUserInfo(data.access_token)
            const response = await socialLogin({ email: userInfo.email, fullName: userInfo.name })
            login({ ...response.user })
            localStorage.setItem('accessToken', response.accessToken)
            toast.success('Đăng nhập thành công')
            if (redirect) navigate(routes.myAccount)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Đăng nhập không thành công')
        } finally {
            setIsLoading(false)
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
