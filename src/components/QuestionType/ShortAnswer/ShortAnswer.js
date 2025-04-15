import classNames from 'classnames/bind'
import styles from './ShortAnswer.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function ShortAnswer({ id, name, onChange }) {
    return (
        <div className={cx('short-answer')}>
            <FontAwesomeIcon icon={faArrowRight} className={cx('arrow')} />
            <input type="text" id={id} name={name} onChange={onChange} />
        </div>
    )
}

export default ShortAnswer
