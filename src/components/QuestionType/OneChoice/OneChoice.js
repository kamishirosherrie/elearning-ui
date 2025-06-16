import classNames from 'classnames/bind'
import styles from './OneChoice.module.scss'
import { convertIndex } from '../convertIndex'

const cx = classNames.bind(styles)

function OneChoice({ id, index, name, value, checked, onChange }) {
    return (
        <div className={cx('one-choice')}>
            <input type="radio" id={id} name={name} value={value} checked={checked} onChange={onChange} />
            <label htmlFor={id}>
                ({convertIndex(index)}) {value}
            </label>
        </div>
    )
}

export default OneChoice
