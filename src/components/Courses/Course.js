import classNames from 'classnames/bind'
import styles from './Course.module.scss'
import { CheckedIcon, ProIcon, StartIcon } from '../Icons/Icon'

const cx = classNames.bind(styles)

function Course({
    fullName,
    listLevel,
    myLevel,
    myTarget,
    listTarget,
    routeDescription,
    courseDescription,
    price,
    priceDiscount,
    proPrice,
    proPriceDiscount,
}) {
    const handleOnClickLevel = () => {
        const level = document.querySelector(`.${cx('level')}`)
        level.classList.toggle(`${cx('show')}`)
    }
    const handleOnClickTarget = () => {
        const target = document.querySelector(`.${cx('target')}`)
        target.classList.toggle(`${cx('show')}`)
    }
    return (
        <div className={cx('container')}>
            <h2>Xin chào {fullName}!</h2>
            <h1>Thiết kế lộ trình học dành riêng cho bạn ngay tại đây!</h1>
            <div className={cx('routes')}>
                <div className={cx('my-level')}>
                    Trình độ của tôi
                    <span>{myLevel}</span>
                    <div className={cx('choose-level')}>
                        {listLevel?.map((item, index) => (
                            <div className={cx('level')} key={index} onClick={handleOnClickLevel}>
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
                            <div className={cx('target')} key={index} onClick={handleOnClickTarget}>
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
                        <div className={cx('route')} key={index}>
                            <span>Chặng {index}</span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
                <div className={cx('buy-course')}>
                    <div className={cx('free')}>
                        <StartIcon className={cx('free-icon')} />
                        <span>Tự học chủ động</span>
                        <span>{priceDiscount} VND</span>
                        <span>
                            {price} VND -{100 - (priceDiscount / price) * 100}%
                        </span>
                        <div className={cx('coupon')}>
                            <input type="text" placeholder="Nhập mã giảm giá" />
                            <button>Áp dụng</button>
                        </div>
                        <button>Đăng ký học ngay</button>
                        <div className={cx('benefit')}>
                            {courseDescription?.map((item, index) => (
                                <div className={cx('description')} key={index}>
                                    <CheckedIcon />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx('pro')}>
                        <ProIcon className={cx('icon')} />
                        <span>Học và luyện đề toàn diện</span>
                        <span>{proPriceDiscount} VND</span>
                        <span>
                            {proPrice} VND -{100 - (proPriceDiscount / proPrice) * 100}%
                        </span>
                        <div className={cx('coupon')}>
                            <input type="text" placeholder="Nhập mã giảm giá" />
                            <button>Áp dụng</button>
                        </div>
                        <button>Đăng ký học ngay</button>
                        <div className={cx('benefit')}>
                            {courseDescription?.map((item, index) => (
                                <div className={cx('description')} key={index}>
                                    <CheckedIcon />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Course
