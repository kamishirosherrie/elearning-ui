import { useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Course.module.scss'

import Header from '../../layouts/Header/Header'
import ListLesson from '../../components/ListLesson/ListLesson'
import { useEffect, useState } from 'react'
import { getCourseBySlug } from '../../api/courseApi'

const cx = classNames.bind(styles)

function Course() {
    const slug = useParams().courseName
    const [course, setCourse] = useState({})

    useEffect(() => {
        const getCourseInfo = async () => {
            try {
                const response = await getCourseBySlug(slug)
                setCourse(response)
            } catch (error) {
                console.log('Error:', error)
            }
        }
        getCourseInfo()
    }, [slug])
    return (
        <div className={cx('wrapper')}>
            {/* <Header /> */}
            <h1>{course.title}</h1>
            <h1>{course.description}</h1>
            <ListLesson slug={slug} />
        </div>
    )
}

export default Course
