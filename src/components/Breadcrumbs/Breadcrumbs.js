import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Breadcrumbs.module.scss'

const cx = classNames.bind(styles)

function Breadcrumbs({ items }) {
    return (
        <nav className={cx('breadcrumb')}>
            {items.map((item, index) => (
                <span key={index} className={cx('breadcrumb-item')}>
                    {item.to ? (
                        <Link to={item.to}>{item.label}</Link>
                    ) : (
                        <span className={cx('current')}>{item.label}</span>
                    )}
                    {index < items.length - 1 && <span className={cx('separator')}>/</span>}
                </span>
            ))}
        </nav>
    )
}

export default Breadcrumbs
