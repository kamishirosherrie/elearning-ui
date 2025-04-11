import classNames from 'classnames/bind'
import styles from './MySubmission.module.scss'
import MainAccount from '../../../layouts/MainAccount/MainAccount'

const cx = classNames.bind(styles)

function MySubmission() {
    return <MainAccount title="Lịch sử làm bài">MySubmission</MainAccount>
}

export default MySubmission
