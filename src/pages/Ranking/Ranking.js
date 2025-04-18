import classNames from 'classnames/bind'
import styles from './Ranking.module.scss'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import { useContext, useEffect, useState } from 'react'
import { getRanking } from '../../api/submissionApi'
import AuthContext from '../../context/AuthContext'

const cx = classNames.bind(styles)

function Ranking() {
    const { user } = useContext(AuthContext)
    const [ranking, setRanking] = useState([])

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

    return (
        <MainLayout>
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
                                { me: item._id === user._id },
                                { first: index === 0, second: index === 1, third: index === 2 },
                            )}
                        >
                            <td>{index + 1}</td>
                            <td>
                                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : null}
                                {item.user.fullName}
                            </td>
                            <td>{item.rankTitle}</td>
                            <td>{item.quizzeCount}</td>
                            <td>{item.totalScore}</td>
                        </tr>
                    ))}
                    {ranking.map((item, index) => (
                        <tr key={item._id} className={cx('row', { second: true })}>
                            <td>{index + 1}</td>
                            <td>
                                🥈
                                {item.user.fullName}
                            </td>
                            <td>{item.rankTitle}</td>
                            <td>{item.quizzeCount}</td>
                            <td>{item.totalScore}</td>
                        </tr>
                    ))}
                    {ranking.map((item, index) => (
                        <tr key={item._id} className={cx('row', { third: true })}>
                            <td>{index + 1}</td>
                            <td>🥉{item.user.fullName}</td>
                            <td>{item.rankTitle}</td>
                            <td>{item.quizzeCount}</td>
                            <td>{item.totalScore}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </MainLayout>
    )
}

export default Ranking
