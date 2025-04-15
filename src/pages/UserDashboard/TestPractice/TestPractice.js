import classNames from 'classnames/bind'
import styles from './TestPractice.module.scss'
import MainAccount from '../../../layouts/MainAccount/MainAccount'

const cx = classNames.bind(styles)

const testPractices = [
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
]

function TestPractice() {
    return (
        <MainAccount>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h2 className={cx('title')}>Phòng Luyện Đề Ảo 4 Kỹ Năng TOEIC</h2>
                    <p className={cx('description')}>
                        Thuần thục kỹ năng làm bài thi thật TOEIC thông qua việc luyện đề hằng ngày.
                    </p>
                    <p className={cx('description')}>
                        Duy nhất tại EMaster, bạn dễ dàng làm chủ kỹ năng Speaking, Writing với bộ đôi Phòng Speaking &
                        Writing ảo chuẩn format kỳ thi TOEIC.
                    </p>
                    <p className={cx('description')}>Luyện không giới hạn bộ đề, full 4 kỹ năng TOEIC quan trọng.</p>
                </div>
                {testPractices.map((practice) => (
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
