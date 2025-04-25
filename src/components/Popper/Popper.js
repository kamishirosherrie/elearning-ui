import React from 'react'
import Tippy from '@tippyjs/react/headless'

import classNames from 'classnames/bind'
import styles from './Popper.module.scss'

const cx = classNames.bind(styles)

function Popper({ content, children }) {
    const handleRender = () => {
        return <div className={cx('wrapper')}>{content}</div>
    }

    return (
        <Tippy interactive delay={[0, 300]} hideOnClick={false} placement="bottom-end" render={handleRender}>
            {children}
        </Tippy>
    )
}

export default Popper
