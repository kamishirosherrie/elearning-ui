import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './ScrollToTopButton.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function ScrollToTopButton() {
    const [active, setActive] = useState(false)

    const handleOnClick = () => {
        if (window.scrollY > window.innerHeight / 3) {
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > window.innerHeight / 3) {
                setActive(true)
            } else {
                setActive(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className={cx('scroll-top', { active })} onClick={handleOnClick}>
            <FontAwesomeIcon className={cx('icon')} icon={faAnglesUp} />
        </div>
    )
}

export default ScrollToTopButton
