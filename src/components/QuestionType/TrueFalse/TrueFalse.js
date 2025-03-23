import classNames from 'classnames/bind'
import styles from './TrueFalse.module.scss'

const cx = classNames.bind(styles)

function TrueFalse({ id, name, value, onChange }) {
    return (
        <div className={cx('wrapper')}>
            <input type="checkbox" id={id} name={name} value={value} onChange={onChange} />
            <label htmlFor={id}>{value}</label>
        </div>
    )
}

export default TrueFalse
