import classNames from 'classnames/bind'
import styles from './Ranking.module.scss'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import { useContext, useEffect, useState } from 'react'
import { getRanking } from '../../api/submissionApi'
import AuthContext from '../../context/AuthContext'
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'

const cx = classNames.bind(styles)

function Ranking() {
    const { user } = useContext(AuthContext)
    const breadcrumbs = useBreadcrumbs([{ label: 'Xếp hạng', to: null }])

    const [ranking, setRanking] = useState([])
    const [userRankIndex, setUserRankIndex] = useState(0)
    const [userRankInfo, setUserRankInfo] = useState({})

    const [showRankUp, setShowRankUp] = useState(false)
    const [newRank, setNewRank] = useState('')
    const [hideToast, setHideToast] = useState(false)

    useEffect(() => {
        const getGlobalRanking = async () => {
            try {
                const rank = await getRanking()
                console.log('Ranking: ', rank)

                setRanking(rank)
            } catch (error) {
                console.log('Get global ranking failed: ', error)
            }
        }

        getGlobalRanking()
    }, [])

    useEffect(() => {
        if (ranking && user) {
            const userRanking = ranking.find((item) => item._id === user._id)
            if (!userRanking) return
            setUserRankInfo(userRanking)

            const userIndex = ranking.findIndex((item) => item._id === user._id)
            setUserRankIndex(userIndex)

            const previousRank = localStorage.getItem('userRank')
            if (previousRank && previousRank !== userRanking.rankTitle) {
                setShowRankUp(true)
                setNewRank(userRanking.rankTitle)

                const hideTimer = setTimeout(() => setHideToast(true), 4500)
                const removeTimer = setTimeout(() => {
                    setShowRankUp(false)
                    setHideToast(false)
                }, 5000)

                return () => {
                    clearTimeout(hideTimer)
                    clearTimeout(removeTimer)
                }
            }
            localStorage.setItem('userRank', userRanking.rankTitle)
        }
    }, [ranking, user])

    return (
        <MainLayout>
            <Breadcrumbs items={breadcrumbs} />
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h1 className={cx('title')}>Bảng Xếp Hạng Toàn Trường</h1>
                    <p className={cx('subtext')}>Cạnh tranh lành mạnh - Chạm đỉnh vinh quang!</p>
                </div>
                <div className={cx('content')}>
                    <table className={cx('leaderboard')}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên học viên</th>
                                <th>Hạng</th>
                                <th>Số đề đã làm</th>
                                <th>Tổng điểm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ranking.map((item, index) => (
                                <tr
                                    key={item._id}
                                    className={cx(
                                        'row',
                                        { me: item._id === user?._id },
                                        { first: index === 0, second: index === 1, third: index === 2 },
                                    )}
                                >
                                    <td className={cx({ medal: index < 3 })}>
                                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                                    </td>
                                    <td>{item.user.fullName}</td>
                                    <td>{item.rankTitle}</td>
                                    <td>{item.quizzeCount}</td>
                                    <td>{item.totalScore}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {user && (
                        <div className={cx('user-info')}>
                            {/* <img src={user?.avatar} alt="Avatar" className={cx('avatar')} /> */}
                            <h2>{user?.fullName}</h2>
                            <p>
                                Hạng: <strong>{userRankInfo?.rankTitle || 'Chưa xếp hạng'}</strong>
                            </p>
                            <p>
                                Tổng điểm: <strong>{userRankInfo?.totalScore || 0}</strong>
                            </p>
                            <p>
                                Số bài đã làm: <strong>{userRankInfo?.quizzeCount || 0}</strong>
                            </p>
                            <p>
                                Vị trí bảng xếp hạng:{' '}
                                <strong>{userRankInfo.rankTitle ? userRankIndex + 1 : 'Unrank'}</strong>
                            </p>
                        </div>
                    )}
                </div>
            </div>
            {showRankUp && (
                <div className={cx('rank-up-toast', { hide: hideToast })}>
                    <span>
                        🎉 Bạn đã thăng lên hạng <strong>{newRank}</strong>!
                    </span>
                    <div className={cx('rank-up-progress')}></div>
                </div>
            )}
        </MainLayout>
    )
}

export default Ranking
