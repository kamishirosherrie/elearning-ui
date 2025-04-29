import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './NewsDetail.module.scss'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs'
import { useLoading } from '../../context/LoadingContext'

const cx = classNames.bind(styles)

function NewsDetail() {
    const { newsId } = useParams()
    const { setIsLoading } = useLoading()
    const [newsItem, setNewsItem] = useState(null)

    const breadcrumbs = useBreadcrumbs([{ label: newsItem?.title, to: null }])

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                setIsLoading(true)
                const response = {
                    id: 1,
                    title: 'Upcoming Events',
                    description: 'Please wait for our upcoming events and moments',
                    image: '/images/news1.jpg',
                    date: '2025-03-05',
                    content: 'This is the detailed content of the news item.',
                }
                setNewsItem(response)
            } catch (error) {
                console.error('Error fetching news detail:', error)
            } finally {
                setIsLoading(false)
            }
        }

        if (newsId) {
            fetchNewsDetail()
        }
    }, [newsId, setIsLoading])

    return (
        <MainLayout title={newsItem?.title}>
            <Breadcrumbs items={breadcrumbs} />
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h1 className={cx('title')}>{newsItem?.title}</h1>
                    <p className={cx('description')}>{newsItem?.description}</p>
                </div>
                <img src={newsItem?.image} alt={newsItem?.title} className={cx('image')} />
                <div className={cx('content')}>{newsItem?.content}</div>
            </div>
        </MainLayout>
    )
}

export default NewsDetail
