import * as React from 'react'
import styles from './scaletype.module.css'

type Props = {
  value?: string
  scales?: number
  handleAnswerChange: (value: number) => void
}

const Scale = ({ handleAnswerChange, value, scales }: Props) => {
  const handleSelectScale = (value: number) => {
    handleAnswerChange(value)
  }

  return (
    <div className={styles.scales}>
      {[...Array(scales)].map((e) => (
        <div className={styles.scale}></div>
      ))}
    </div>
  )
}

export default Scale
