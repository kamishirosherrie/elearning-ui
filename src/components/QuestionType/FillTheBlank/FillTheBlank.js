import classNames from 'classnames/bind'
import styles from './FillTheBlank.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function FillTheBlank({ id, name, onChange }) {
    return (
        <div className={cx('fill')}>
            <FontAwesomeIcon icon={faArrowRight} className={cx('arrow')} />
            <input type="text" id={id} name={name} onChange={onChange} />
        </div>
    )
}

export default FillTheBlank
