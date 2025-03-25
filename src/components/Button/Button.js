import classNames from 'classnames/bind'
import styles from './Button.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function Button({
    to,
    href,
    hover,
    pink,
    primary,
    outline,
    large,
    small,
    leftIcon,
    rightIcon,
    className,
    children,
    disabled,
    onClick,
    ...passProp
}) {
    let Component = 'button'
    const props = {
        onClick,
        ...passProp,
    }

    if (disabled) {
        delete props.onClick
    }

    if (to) {
        props.to = Component = Link
    } else if (href) {
        props.href = href
        Component = 'a'
    }

    const classNames = cx('wrapper', {
        hover,
        pink,
        primary,
        outline,
        large,
        small,
        leftIcon,
        rightIcon,
        disabled,
        [className]: className,
    })

    return (
        <Component className={classNames} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('text')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Component>
    )
}

export default Button
