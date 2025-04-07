import classNames from 'classnames/bind'
import styles from './ShortAnswer.module.scss'

const cx = classNames.bind(styles)

function ShortAnswer({ id, name, onChange }) {
    return (
        <div className={cx('short-answer')}>
            <h1>
                <input type="text" id={id} name={name} onChange={onChange} />
            </h1>
        </div>
    )
}

export default ShortAnswer
