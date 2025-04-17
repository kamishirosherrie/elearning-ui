import classNames from 'classnames/bind'
import styles from './TestPractice.module.scss'
import MainAccount from '../../../layouts/MainAccount/MainAccount'
import { useState } from 'react'

const cx = classNames.bind(styles)

const skillPractices = {
    all: [
        ...Object.values({
            listening: [
                {
                    id: 1,
                    title: 'TOEIC Listening Practice 1',
                    completed: 2,
                    total: 5,
                    tests: [
                        { id: 1, name: 'Listening Test 01', room: 'Virtual Listening Room' },
                        { id: 2, name: 'Listening Test 02', room: 'Virtual Listening Room' },
                        { id: 3, name: 'Listening Test 03', room: 'Virtual Listening Room' },
                        { id: 4, name: 'Listening Test 04', room: 'Virtual Listening Room' },
                        { id: 5, name: 'Listening Test 05', room: 'Virtual Listening Room' },
                    ],
                },
            ],
            reading: [
                {
                    id: 2,
                    title: 'TOEIC Reading Practice 1',
                    completed: 1,
                    total: 5,
                    tests: [
                        { id: 6, name: 'Reading Test 01', room: 'Virtual Reading Room' },
                        { id: 7, name: 'Reading Test 02', room: 'Virtual Reading Room' },
                        { id: 8, name: 'Reading Test 03', room: 'Virtual Reading Room' },
                        { id: 9, name: 'Reading Test 04', room: 'Virtual Reading Room' },
                        { id: 10, name: 'Reading Test 05', room: 'Virtual Reading Room' },
                    ],
                },
            ],
            speaking: [
                {
                    id: 3,
                    title: 'TOEIC Speaking Practice 1',
                    completed: 3,
                    total: 5,
                    tests: [
                        { id: 11, name: 'Speaking Test 01', room: 'Virtual Speaking Room' },
                        { id: 12, name: 'Speaking Test 02', room: 'Virtual Speaking Room' },
                        { id: 13, name: 'Speaking Test 03', room: 'Virtual Speaking Room' },
                        { id: 14, name: 'Speaking Test 04', room: 'Virtual Speaking Room' },
                        { id: 15, name: 'Speaking Test 05', room: 'Virtual Speaking Room' },
                    ],
                },
            ],
            writing: [
                {
                    id: 1,
                    title: 'TOEIC Writing Essential 1',
                    completed: 0,
                    total: 5,
                    tests: [
                        { id: 1, name: 'Đề 01', room: 'Virtual Writing Room' },
                        { id: 2, name: 'Đề 02', room: 'Virtual Writing Room' },
                        { id: 3, name: 'Đề 03', room: 'Virtual Writing Room' },
                        { id: 4, name: 'Đề 04', room: 'Virtual Writing Room' },
                        { id: 5, name: 'Đề 05', room: 'Virtual Writing Room' },
                    ],
                },
                {
                    id: 2,
                    title: 'TOEIC Writing Essential 2',
                    completed: 0,
                    total: 5,
                    tests: [
                        { id: 6, name: 'Đề 06', room: 'Virtual Writing Room' },
                        { id: 7, name: 'Đề 07', room: 'Virtual Writing Room' },
                        { id: 8, name: 'Đề 08', room: 'Virtual Writing Room' },
                        { id: 9, name: 'Đề 09', room: 'Virtual Writing Room' },
                        { id: 10, name: 'Đề 10', room: 'Virtual Writing Room' },
                    ],
                },
            ],
        })
            .flat()
            .map((practice) => ({
                ...practice,
                tests: [...practice.tests],
            })),
    ],
    listening: [
        {
            id: 1,
            title: 'TOEIC Listening Practice 1',
            completed: 2,
            total: 5,
            tests: [
                { id: 1, name: 'Listening Test 01', room: 'Virtual Listening Room' },
                { id: 2, name: 'Listening Test 02', room: 'Virtual Listening Room' },
                { id: 3, name: 'Listening Test 03', room: 'Virtual Listening Room' },
                { id: 4, name: 'Listening Test 04', room: 'Virtual Listening Room' },
                { id: 5, name: 'Listening Test 05', room: 'Virtual Listening Room' },
            ],
        },
    ],
    reading: [
        {
            id: 2,
            title: 'TOEIC Reading Practice 1',
            completed: 1,
            total: 5,
            tests: [
                { id: 6, name: 'Reading Test 01', room: 'Virtual Reading Room' },
                { id: 7, name: 'Reading Test 02', room: 'Virtual Reading Room' },
                { id: 8, name: 'Reading Test 03', room: 'Virtual Reading Room' },
                { id: 9, name: 'Reading Test 04', room: 'Virtual Reading Room' },
                { id: 10, name: 'Reading Test 05', room: 'Virtual Reading Room' },
            ],
        },
    ],
    speaking: [
        {
            id: 3,
            title: 'TOEIC Speaking Practice 1',
            completed: 3,
            total: 5,
            tests: [
                { id: 11, name: 'Speaking Test 01', room: 'Virtual Speaking Room' },
                { id: 12, name: 'Speaking Test 02', room: 'Virtual Speaking Room' },
                { id: 13, name: 'Speaking Test 03', room: 'Virtual Speaking Room' },
                { id: 14, name: 'Speaking Test 04', room: 'Virtual Speaking Room' },
                { id: 15, name: 'Speaking Test 05', room: 'Virtual Speaking Room' },
            ],
        },
    ],
    writing: [
        {
            id: 1,
            title: 'TOEIC Writing Essential 1',
            completed: 0,
            total: 5,
            tests: [
                { id: 1, name: 'Đề 01', room: 'Virtual Writing Room' },
                { id: 2, name: 'Đề 02', room: 'Virtual Writing Room' },
                { id: 3, name: 'Đề 03', room: 'Virtual Writing Room' },
                { id: 4, name: 'Đề 04', room: 'Virtual Writing Room' },
                { id: 5, name: 'Đề 05', room: 'Virtual Writing Room' },
            ],
        },
        {
            id: 2,
            title: 'TOEIC Writing Essential 2',
            completed: 0,
            total: 5,
            tests: [
                { id: 6, name: 'Đề 06', room: 'Virtual Writing Room' },
                { id: 7, name: 'Đề 07', room: 'Virtual Writing Room' },
                { id: 8, name: 'Đề 08', room: 'Virtual Writing Room' },
                { id: 9, name: 'Đề 09', room: 'Virtual Writing Room' },
                { id: 10, name: 'Đề 10', room: 'Virtual Writing Room' },
            ],
        },
    ],
}

function TestPractice() {
    const [activeTab, setActiveTab] = useState('all')

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
                    skillPractices.all.map((practice) => (
                        <div key={practice.id} className={cx('practice')}>
                            <div className={cx('practice-header')}>
                                <h3>{practice.title}</h3>
                                <span>
                                    {practice.completed}/{practice.total} Đề
                                </span>
                            </div>
                            <div className={cx('practice-tests')}>
                                {practice.tests.map((test) => (
                                    <div key={test.id} className={cx('test')}>
                                        <h4>{test.name}</h4>
                                        <p>{test.room}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                {activeTab === 'listening' &&
                    skillPractices.listening.map((practice) => (
                        <div key={practice.id} className={cx('practice')}>
                            <div className={cx('practice-header')}>
                                <h3>{practice.title}</h3>
                                <span>
                                    {practice.completed}/{practice.total} Đề
                                </span>
                            </div>
                            <div className={cx('practice-tests')}>
                                {practice.tests.map((test) => (
                                    <div key={test.id} className={cx('test')}>
                                        <h4>{test.name}</h4>
                                        <p>{test.room}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                {activeTab === 'reading' &&
                    skillPractices.reading.map((practice) => (
                        <div key={practice.id} className={cx('practice')}>
                            <div className={cx('practice-header')}>
                                <h3>{practice.title}</h3>
                                <span>
                                    {practice.completed}/{practice.total} Đề
                                </span>
                            </div>
                            <div className={cx('practice-tests')}>
                                {practice.tests.map((test) => (
                                    <div key={test.id} className={cx('test')}>
                                        <h4>{test.name}</h4>
                                        <p>{test.room}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                {activeTab === 'speaking' &&
                    skillPractices.speaking.map((practice) => (
                        <div key={practice.id} className={cx('practice')}>
                            <div className={cx('practice-header')}>
                                <h3>{practice.title}</h3>
                                <span>
                                    {practice.completed}/{practice.total} Đề
                                </span>
                            </div>
                            <div className={cx('practice-tests')}>
                                {practice.tests.map((test) => (
                                    <div key={test.id} className={cx('test')}>
                                        <h4>{test.name}</h4>
                                        <p>{test.room}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                {activeTab === 'writing' &&
                    skillPractices.writing.map((practice) => (
                        <div key={practice.id} className={cx('practice')}>
                            <div className={cx('practice-header')}>
                                <h3>{practice.title}</h3>
                                <span>
                                    {practice.completed}/{practice.total} Đề
                                </span>
                            </div>
                            <div className={cx('practice-tests')}>
                                {practice.tests.map((test) => (
                                    <div key={test.id} className={cx('test')}>
                                        <h4>{test.name}</h4>
                                        <p>{test.room}</p>
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
