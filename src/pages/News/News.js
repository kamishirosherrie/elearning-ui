import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './News.module.scss'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import Button from '../../components/Button/Button'
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'

const cx = classNames.bind(styles)

function News() {
    const [news, setNews] = useState([])
    const navigate = useNavigate()
    const breadcrumbs = useBreadcrumbs()

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = [
                    {
                        id: '0990430fpemek4',
                        title: 'Upcoming Events',
                        description: 'Please wait for our upcoming events and moments',
                        image: '/images/news1.jpg',
                        date: '2025-03-05',
                    },
                ]
                setNews(response)
            } catch (error) {
                console.error('Error fetching news:', error)
            }
        }

        fetchNews()
    }, [])

    return (
        <MainLayout>
            <Breadcrumbs items={breadcrumbs} />
            <div className={cx('wrapper')}>
                <h1 className={cx('title')}>Tin tức và Sự kiện</h1>
                <div className={cx('news-list')}>
                    {news.map((item) => (
                        <div key={item.id} className={cx('news-item')}>
                            <img src={item.image} alt={item.title} className={cx('news-image')} />
                            <div className={cx('news-content')}>
                                <h2 className={cx('news-title')}>{item.title}</h2>
                                <p className={cx('news-description')}>{item.description}</p>
                                <span className={cx('news-date')}>{item.date}</span>
                            </div>
                            <div className={cx('see-more')}>
                                <Button onClick={() => navigate(`/news/${item.id}`)}>Xem chi tiết</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}

export default News
