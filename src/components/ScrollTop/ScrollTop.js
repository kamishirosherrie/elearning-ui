import './ScrollTop.css'
import { useEffect } from 'react'

function ScrollTop() {
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
            const scrollButton = document.querySelector('.scroll-top')
            if (window.pageYOffset > window.innerHeight / 3) {
                scrollButton.classList.add('active')
            } else {
                scrollButton.classList.remove('active')
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className="scroll-top" onClick={handleOnClick}>
            <span>^</span>
        </div>
    )
}

export default ScrollTop
