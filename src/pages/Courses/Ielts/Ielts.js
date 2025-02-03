import classNames from 'classnames/bind'
import styles from './Ielts.module.scss'
import Header from '../../../layouts/Header/Header'
import Course from '../../../components/Courses/Course'
import { useState } from 'react'

const cx = classNames.bind(styles)

function Ielts() {
    const [fullName, setFullName] = useState('Duong Hang')
    const listLevel = ['Mất gốc - 3.5', 'IELTS 4.0 - 4.5', 'IELTS 5.0 - 5.5', 'IELTS 6.0 - 6.5']
    const listTarget = ['IELTS 5.0+', 'IELTS 6.0+', 'IELTS 6.5 - 7.0+']
    const myLevel = 'IELTS 4.0 - 4.5'
    const myTarget = 'IELTS 6.0+'
    const routeDescription = ['Lấy gốc IELTS 4.0', 'Khởi động IELTS 5.0', 'Bứt phá IELTS 6.0', 'Chinh phục IELTS 6.5+']
    console.log(fullName, listLevel, myLevel, myTarget, listTarget, routeDescription)

    return (
        <div className={cx('wrapper')}>
            {/* <Header /> */}
            <Course
                fullName={fullName}
                listLevel={listLevel}
                myLevel={myLevel}
                listTarget={listTarget}
                myTarget={myTarget}
                routeDescription={routeDescription}
            />
        </div>
    )
}

export default Ielts
