import classNames from 'classnames/bind'
import styles from './Ielts.module.scss'
import Header from '../../../layouts/Header/Header'
import Course from '../../../components/Courses/Course'

const cx = classNames.bind(styles)

function Ielts() {
    const fullName = 'Duong Hang'
    const listLevel = ['Mất gốc - 3.5', 'IELTS 4.0 - 4.5', 'IELTS 5.0 - 5.5', 'IELTS 6.0 - 6.5']
    const listTarget = ['IELTS 5.0+', 'IELTS 6.0+', 'IELTS 6.5 - 7.0+']
    const myLevel = 'IELTS 4.0 - 4.5'
    const myTarget = 'IELTS 6.0+'
    const routeDescription = ['Lấy gốc IELTS 4.0', 'Khởi động IELTS 5.0', 'Bứt phá IELTS 6.0', 'Chinh phục IELTS 6.5+']
    const courseDescription = [
        'Học & tương tác chủ động với video bài giảng',
        'Làm bài tập liên tục, không giới hạn',
        'Được chấm chữa sát sao Speaking & Writing với giáo viên IELTS 8.0+',
        'Học & Luyện đề theo kế hoạch học tập được cá nhân hóa',
        'Luyện Speaking Ảo hàng ngày với bộ đề Dự Đoán, đề Thi mới nhất',
        'Luyện Writing Ảo hàng ngày với bộ đề Độc Quyền, đề Thi Thật mới nhất',
        'Sử dụng kho ý tưởng, bài mẫu hay, gồm các bài từ cựu giám khảo IELTS',
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

export default Ielts
