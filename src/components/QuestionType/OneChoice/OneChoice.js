import classNames from 'classnames/bind'
import styles from './OneChoice.module.scss'

const cx = classNames.bind(styles)

function OneChoice({ id, name, value, checked, onChange }) {
    return (
        <div className={cx('wrapper')}>
            <input type="radio" id={id} name={name} value={value} checked={checked} onChange={onChange} />
            <label htmlFor={id}>{value}</label>
        </div>
    )
}

export default OneChoice
