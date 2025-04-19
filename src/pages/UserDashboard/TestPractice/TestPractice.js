import classNames from 'classnames/bind'
import styles from './TestPractice.module.scss'
import MainAccount from '../../../layouts/MainAccount/MainAccount'
import { useEffect, useState } from 'react'
import { getAllTestSets } from '../../../api/testSetApi'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../routes/route'

const cx = classNames.bind(styles)

function TestPractice() {
    const navigate = useNavigate()
    const [testSets, setTestSets] = useState([])
    const [listeningSets, setListeningSets] = useState([])
    const [readingSets, setReadingSets] = useState([])
    const [speakingSets, setSpeakingSets] = useState([])
    const [writingSets, setWritingSets] = useState([])

    const [activeTab, setActiveTab] = useState('all')

    const handleClick = (skill, slug) => {
        switch (skill) {
            case 'Listening':
                navigate(`${routes.listeningPractice}/${slug}`)
                break
            case 'Reading':
                navigate(`${routes.readingPractice}/${slug}`)
                break
            case 'Speaking':
                navigate(`${routes.speakingPractice}/${slug}`)
                break
            case 'Writing':
                navigate(`${routes.writingPractice}/${slug}`)
                break
            default:
                break
        }
    }

    useEffect(() => {
        const getTestSets = async () => {
            const testSets = await getAllTestSets()
            console.log('testSets: ', testSets)
            const listening = testSets.filter((item) => item.skill === 'Listening')
            const reading = testSets.filter((item) => item.skill === 'Reading')
            const speaking = testSets.filter((item) => item.skill === 'Speaking')
            const writing = testSets.filter((item) => item.skill === 'Writing')
            setTestSets(testSets)
            setListeningSets(listening)
            setReadingSets(reading)
            setSpeakingSets(speaking)
            setWritingSets(writing)
        }

        getTestSets()
    }, [])

    return (
        <MainAccount>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h2 className={cx('title')}>Phòng Luyện Đề Ảo 4 Kỹ Năng TOEIC</h2>
                    <ul>
                        <li className={cx('description')}>
                            Thuần thục kỹ năng làm bài thi thật TOEIC thông qua việc luyện đề hằng ngày.
                        </li>
                        <li className={cx('description')}>
                            Duy nhất tại Prep, bạn dễ dàng làm chủ kỹ năng Speaking, Writing với bộ đôi Phòng Speaking &
                            Writing ảo chuẩn format kỳ thi TOEIC.
                        </li>
                        <li className={cx('description')}>
                            Luyện không giới hạn bộ đề, full 4 kỹ năng TOEIC quan trọng chỉ với một tài khoản PRO.
                        </li>
                    </ul>
                </div>
                <div className={cx('test-type')}>
                    <div className={cx('item', { active: activeTab === 'all' })} onClick={() => setActiveTab('all')}>
                        <span>Tất cả kĩ năng</span>
                    </div>
                    <div
                        className={cx('item', { active: activeTab === 'listening' })}
                        onClick={() => setActiveTab('listening')}
                    >
                        <span>Listening</span>
                    </div>
                    <div
                        className={cx('item', { active: activeTab === 'reading' })}
                        onClick={() => setActiveTab('reading')}
                    >
                        <span>Reading</span>
                    </div>
                    <div
                        className={cx('item', { active: activeTab === 'speaking' })}
                        onClick={() => setActiveTab('speaking')}
                    >
                        <span>Speaking</span>
                    </div>
                    <div
                        className={cx('item', { active: activeTab === 'writing' })}
                        onClick={() => setActiveTab('writing')}
                    >
                        <span>Writing</span>
                    </div>
                </div>
                {activeTab === 'all' &&
                    testSets.map((testSet) => (
                        <div className={cx('practice')}>
                            <div className={cx('practice-header')} key={testSet._id}>
                                <h3>{testSet.title}</h3>
                                <span>
                                    {testSet.quizzeDone}/{testSet.totalQuizzes} Đề
                                </span>
                            </div>
                            <div className={cx('practice-tests')}>
                                {testSet.quizzes?.map((quizze) => (
                                    <div className={cx('test')} onClick={() => handleClick(testSet.skill, quizze.slug)}>
                                        <h4>{quizze.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                {activeTab === 'listening' &&
                    listeningSets.map((testSet) => (
                        <div className={cx('practice')}>
                            <div className={cx('practice-header')} key={testSet._id}>
                                <h3>{testSet.title}</h3>
                                <span>
                                    {testSet.quizzeDone}/{testSet.totalQuizzes} Đề
                                </span>
                            </div>
                            <div className={cx('practice-tests')}>
                                {testSet.quizzes?.map((quizze) => (
                                    <div className={cx('test')} onClick={() => handleClick(testSet.skill, quizze.slug)}>
                                        <h4>{quizze.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                {activeTab === 'reading' &&
                    readingSets.map((testSet) => (
                        <div className={cx('practice')}>
                            <div className={cx('practice-header')} key={testSet._id}>
                                <h3>{testSet.title}</h3>
                                <span>
                                    {testSet.quizzeDone}/{testSet.totalQuizzes} Đề
                                </span>
                            </div>
                            <div className={cx('practice-tests')}>
                                {testSet.quizzes?.map((quizze) => (
                                    <div className={cx('test')} onClick={() => handleClick(testSet.skill, quizze.slug)}>
                                        <h4>{quizze.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                {activeTab === 'speaking' &&
                    speakingSets.map((testSet) => (
                        <div className={cx('practice')}>
                            <div className={cx('practice-header')} key={testSet._id}>
                                <h3>{testSet.title}</h3>
                                <span>
                                    {testSet.quizzeDone}/{testSet.totalQuizzes} Đề
                                </span>
                            </div>
                            <div className={cx('practice-tests')}>
                                {testSet.quizzes?.map((quizze) => (
                                    <div className={cx('test')} onClick={() => handleClick(testSet.skill, quizze.slug)}>
                                        <h4>{quizze.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                {activeTab === 'writing' &&
                    writingSets.map((testSet) => (
                        <div className={cx('practice')}>
                            <div className={cx('practice-header')} key={testSet._id}>
                                <h3>{testSet.title}</h3>
                                <span>
                                    {testSet.quizzeDone}/{testSet.totalQuizzes} Đề
                                </span>
                            </div>
                            <div className={cx('practice-tests')}>
                                {testSet.quizzes?.map((quizze) => (
                                    <div className={cx('test')} onClick={() => handleClick(testSet.skill, quizze.slug)}>
                                        <h4>{quizze.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </MainAccount>
    )
}

export default TestPractice
