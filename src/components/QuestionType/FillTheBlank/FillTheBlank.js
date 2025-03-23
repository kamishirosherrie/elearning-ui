import classNames from 'classnames/bind'
import styles from './FillTheBlank.module.scss'

const cx = classNames.bind(styles)

function FillTheBlank({ id, name, onChange }) {
    return (
        <div className={cx('wrapper')}>
            <input type="text" id={id} name={name} onChange={onChange} />
        </div>
    )
}

export default FillTheBlank
