import classNames from 'classnames/bind'
import styles from './Writing.module.scss'

const cx = classNames.bind(styles)

function Writing({ name, onChange }) {
    return (
        <div className={cx('writing')}>
            <textarea
                name={name}
                type="text"
                placeholder="Write your answer here..."
                className={cx('writing-input')}
                onChange={onChange}
            />
        </div>
    )
}

export default Writing
