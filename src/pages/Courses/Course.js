import { useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Course.module.scss'

import ListLesson from '../../components/ListLesson/ListLesson'
import { useEffect, useState } from 'react'
import { getCourseBySlug } from '../../api/courseApi'
import MainLayout from '../../layouts/MainLayout/MainLayout'

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
        <MainLayout>
            <div className={cx('wrapper')}>
                <h1>{course.title}</h1>
                <span>{course.description}</span>
                <ListLesson slug={slug} />
            </div>
        </MainLayout>
    )
}

export default Course
