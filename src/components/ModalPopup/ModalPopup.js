import ReactModal from 'react-modal'
import classNames from 'classnames/bind'
import styles from './ModalPopup.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import { useEffect } from 'react'

const cx = classNames.bind(styles)
ReactModal.setAppElement('#root')

function ModalPopup({ isOpen, closeModal, children }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Modal"
            className={cx('modal')}
            overlayClassName={cx('overlay')}
        >
            <div className={cx('wrapper')}>
                <span className={cx('close')} onClick={closeModal}>
                    <FontAwesomeIcon icon={faXmark} />
                </span>
                {children}
            </div>
        </ReactModal>
    )
}

export default ModalPopup
