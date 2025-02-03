import classNames from 'classnames/bind'
import styles from './Course.module.scss'
import { CheckedIcon, ProIcon, StartIcon } from '../Icons/Icon'

const cx = classNames.bind(styles)

function Course({ fullName, listLevel, myLevel, myTarget, listTarget, routeDescription }) {
    console.log(fullName, listLevel, myLevel, myTarget, listTarget, routeDescription)
    return (
        <div className={cx('container')}>
            <h2>Xin chào {fullName}!</h2>
            <span>Thiết kế lộ trình học dành riêng cho bạn ngay tại đây!</span>
            <div className={cx('routes')}>
                <div className={cx('my-level')}>
                    Trình độ của tôi
                    <span>{myLevel}</span>
                    <div className={cx('choose-level')}>
                        {listLevel?.map((item, index) => (
                            <div className={cx('level')} key={index}>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('my-target')}>
                    Mục tiêu của tôi
                    <span>{myTarget}</span>
                    <div className={cx('choose-target')}>
                        {listTarget?.map((item, index) => (
                            <div className={cx('target')} key={index}>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={cx('design-route')}>
                <span>Chọn gói phù hợp</span>
                <span>Chinh phục lộ trình mất gốc đến {myTarget}</span>
                <div className={cx('route-wrapper')}>
                    {routeDescription?.map((item, index) => (
                        <div className={cx('route')}>
                            <span>Chặng {index}</span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
                <div className={cx('buy-course')}>
                    <div className={cx('free')}>
                        <StartIcon className={cx('free-icon')} />
                        <span>Tự học chủ động</span>
                        <span>9.000.000 VND</span>
                        <span>12.000.000 VND -25%</span>
                        <div className={cx('coupon')}>
                            <input type="text" placeholder="Nhập mã giảm giá" />
                            <button>Áp dụng</button>
                        </div>
                        <button>Đăng ký học ngay</button>
                        <div className={cx('benefit')}>
                            <div className={cx('description')}>
                                <CheckedIcon />
                                <span>Học & tương tác chủ động với video bài giảng</span>
                            </div>
                            <div className={cx('description')}>
                                <CheckedIcon />
                                <span>Làm bài tập liên tục, không giới hạn</span>
                            </div>
                            <div className={cx('description')}>
                                <CheckedIcon />
                                <span>Được chấm chữa sát sao Speaking & Writing với giáo viên IELTS 8.0+</span>
                            </div>
                            <div className={cx('description')}>
                                <CheckedIcon />
                                <span>Học & Luyện đề theo kế hoạch học tập được cá nhân hóa</span>
                            </div>
                            <div className={cx('description')}>
                                <CheckedIcon />
                                <span>Luyện Speaking Ảo hàng ngày với bộ đề Dự Đoán, đề Thi mới nhất</span>
                            </div>
                            <div className={cx('description')}>
                                <CheckedIcon />
                                <span>Luyện Writing Ảo hàng ngày với bộ đề Độc Quyền, đề Thi Thật mới nhất</span>
                            </div>
                            <div className={cx('description')}>
                                <CheckedIcon />
                                <span>Sử dụng kho ý tưởng, bài mẫu hay, gồm các bài từ cựu giám khảo IELTS</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('pro')}>
                        <ProIcon className={cx('icon')} />
                        <span>Học và luyện đề toàn diện</span>
                        <span>12.000.000 VND</span>
                        <span>16.000.000 VND -25%</span>
                        <div className={cx('coupon')}>
                            <input type="text" placeholder="Nhập mã giảm giá" />
                            <button>Áp dụng</button>
                        </div>
                        <button>Đăng ký học ngay</button>
                        <div className={cx('benefit')}>
                            <div className={cx('description')}>
                                <CheckedIcon />
                                <span>Học & tương tác chủ động với video bài giảng</span>
                            </div>
                            <div className={cx('description')}>
                                <CheckedIcon />
                                <span>Làm bài tập liên tục, không giới hạn</span>
                            </div>
                            <div className={cx('description')}>
                                <CheckedIcon />
                                <span>Được chấm chữa sát sao Speaking & Writing với giáo viên IELTS 8.0+</span>
                            </div>
                            <div className={cx('description')}>
                                <CheckedIcon />
                                <span>Học & Luyện đề theo kế hoạch học tập được cá nhân hóa</span>
                            </div>
                            <div className={cx('description')}>
                                <CheckedIcon />
                                <span>Luyện Speaking Ảo hàng ngày với bộ đề Dự Đoán, đề Thi mới nhất</span>
                            </div>
                            <div className={cx('description')}>
                                <CheckedIcon />
                                <span>Luyện Writing Ảo hàng ngày với bộ đề Độc Quyền, đề Thi Thật mới nhất</span>
                            </div>
                            <div className={cx('description')}>
                                <CheckedIcon />
                                <span>Sử dụng kho ý tưởng, bài mẫu hay, gồm các bài từ cựu giám khảo IELTS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Course
