import styles from './content.module.css'
import * as React from 'react'
import classnames from 'classnames'

type Props = {
  children: React.ReactNode
  noPadding?: boolean
}

const Content = ({ children, noPadding }: Props) => (
  <div className={classnames(noPadding ? styles.noPadding : styles.content)}>
    {children}
  </div>
)

export default Content
