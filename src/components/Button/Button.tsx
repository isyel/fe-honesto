import styles from './button.module.css'
import * as React from 'react'
import classnames from 'classnames'

type Props = {
  onClick: (se: React.SyntheticEvent, ...args: any) => void
  children: React.ReactNode
  secondary?: boolean
  disabled?: boolean
}

const Button = (props: Props) => {
  const { children, secondary, disabled, onClick } = props

  return (
    <button
      className={classnames(styles.button, {
        [styles.secondaryButton]: secondary,
        [styles.disabledButton]: disabled,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
