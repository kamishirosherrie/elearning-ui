import classNames from 'classnames/bind'
import styles from './Toeic.module.scss'
import Course from '../../../components/Courses/Course'
import Header from '../../../layouts/Header/Header'

const cx = classNames.bind(styles)

function Toeic() {
    const fullName = 'Duong Hang'
    const listLevel = ['TOEIC LR 1-295', 'TOEIC LR 300 - 595', 'TOEIC LR 600 - 650']
    const listTarget = ['TOEIC LR 300+', 'TOEIC LR 600+', 'TOEIC LR 800+']
    const myLevel = 'TOEIC LR 1-295'
    const myTarget = 'TOEIC LR 600+'
    const routeDescription = [
        'Lấy lại căn bản',
        'Tăng tốc với đầu ra TOEIC Listening & Reading 600+',
        'Chinh phục đầu ra TOEIC Listening & Reading 800+',
    ]
    const courseDescription = [
        'Học & tương tác chủ động với video bài giảng',
        'Làm bài tập liên tục, không giới hạn',
        'Nắm trọn bí kíp & chiến lược làm đề TOEIC hiệu quả',
        'Thực chiến với bộ đề TOEIC độc quyền, sát đề thi thật',
        'Học & Luyện đề theo kế hoạch học tập được cá nhân hóa',
        'Luyện Speaking Ảo hàng ngày với bộ đề độc quyền, sát nhất',
        'Luyện Writing Ảo hàng ngày với bộ đề độc quyền, sát nhất',
    ]
    const price = 6000000
    const priceDiscount = 3000000
    const proPrice = 10000000
    const proPriceDiscount = 5000000

    return (
        <div className={cx('wrapper')}>
            <Header />
            <Course
                fullName={fullName}
                listLevel={listLevel}
                myLevel={myLevel}
                listTarget={listTarget}
                myTarget={myTarget}
                routeDescription={routeDescription}
                courseDescription={courseDescription}
                price={price}
                priceDiscount={priceDiscount}
                proPrice={proPrice}
                proPriceDiscount={proPriceDiscount}
            />
        </div>
    )
}

export default Toeic
