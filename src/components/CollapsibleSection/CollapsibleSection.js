import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SlideToggle from 'react-slide-toggle'
import classNames from 'classnames/bind'
import styles from './CollapsibleSection.module.scss'

const cx = classNames.bind(styles)

function CollapsibleSection({ title, children }) {
    return (
        <SlideToggle collapsed>
            {({ toggle, setCollapsibleElement, toggleState }) => (
                <div className={cx('section-wrapper')}>
                    <div className={cx('section-header')} onClick={toggle}>
                        <span>{title}</span>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className={cx('icon', {
                                rotate: toggleState !== 'COLLAPSED',
                            })}
                        />
                    </div>

                    <div ref={setCollapsibleElement} className={cx('section-body')}>
                        {children}
                    </div>
                </div>
            )}
        </SlideToggle>
    )
}

export default CollapsibleSection
