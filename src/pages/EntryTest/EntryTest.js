import classNames from 'classnames/bind'
import styles from './EntryTest.module.scss'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import Button from '../../components/Button/Button'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../routes/route'
import AuthContext from '../../context/AuthContext'
import ModalPopup from '../../components/ModalPopup/ModalPopup'
import Login from '../../components/Login/Login'
import Register from '../../components/Register/Register'
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { getQuizzeByType } from '../../api/quizzeApi'

const cx = classNames.bind(styles)

function EntryTest() {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const breadcrumbs = useBreadcrumbs()

    const [tests, setTests] = useState([])
    const [selectedTest, setSelectedSet] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(true)
    const [isSelected, setIsSelected] = useState([])

    const closeModal = () => {
        setIsOpen(false)
        setIsLoginOpen(true)
    }

    const handleClickRegister = () => {
        setIsLoginOpen(false)
    }

    const handleClickLogin = () => {
        setIsLoginOpen(true)
    }

    const handleClick = (slug, index) => {
        setIsSelected((prev) => prev.map((item, i) => (i === index ? !item : false)))
        setSelectedSet(slug)
    }

    const handleSubmit = () => {
        if (user) {
            navigate(`${routes.quizze}/${selectedTest}`)
        } else {
            setIsOpen(true)
        }
    }

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const tests = await getQuizzeByType('entrytest')
                console.log(tests)
                setTests(tests)
            } catch (error) {
                console.error('Failed to fetch tests:', error)
            }
        }
        if (user) {
            fetchTests()
        }
    }, [user])

    return (
        <MainLayout>
            <Breadcrumbs items={breadcrumbs} />
            <div className={cx('wrapper')}>
                <h2 className={cx('title')}>Entry test</h2>
                <div className={cx('content')}>
                    {tests.map((test, index) => (
                        <div key={test._id} className={cx('content-item', { selected: isSelected[index] })} onClick={() => handleClick(test.slug, index)}>
                            <h3 className={cx('content-title')}>{test.title}</h3>
                            <p className={cx('content-description')}>Thời gian làm bài: {test.time}</p>
                            <p className={cx('content-description')}>{test.description}</p>
                        </div>
                    ))}
                    <Button blue hover onClick={handleSubmit}>
                        Start
                    </Button>
                </div>
            </div>
            <ModalPopup isOpen={isOpen} closeModal={closeModal}>
                {isLoginOpen ? <Login handleClickRegister={handleClickRegister} redirect={false} /> : <Register handleClickLogin={handleClickLogin} redirect={false} />}
            </ModalPopup>
        </MainLayout>
    )
}

export default EntryTest
