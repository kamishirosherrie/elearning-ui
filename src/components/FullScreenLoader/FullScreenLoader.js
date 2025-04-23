import ReactDOM from 'react-dom'
import classNames from 'classnames/bind'
import styles from './FullScreenLoader.module.scss'

const cx = classNames.bind(styles)

function FullScreenLoader() {
    return ReactDOM.createPortal(
        <div className={cx('celestial-overlay')}>
            <div className={cx('particle-background')}>
                {[...Array(30)].map((_, i) => (
                    <span
                        key={i}
                        className={cx('particle')}
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}
            </div>
            <div className={cx('aurora-core')}></div>
        </div>,
        document.body,
    )
}

export default FullScreenLoader
