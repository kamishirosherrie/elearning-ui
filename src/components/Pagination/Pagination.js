import React from 'react'
import classNames from 'classnames/bind'
import styles from './Pagination.module.scss'

const cx = classNames.bind(styles)

function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className={cx('pagination')}>
            <button
                className={cx('button', { disabled: currentPage === 1 })}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                    key={page}
                    className={cx('button', { active: page === currentPage })}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className={cx('button', { disabled: currentPage === totalPages })}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination
