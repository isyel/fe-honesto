import * as React from 'react'
import styles from './texttype.module.css'

type Props = {
  value?: string
  handleAnswerChange: (se: React.SyntheticEvent) => void
}

const TextType = ({ handleAnswerChange, value }: Props) => {
  const handleTextChange = (e: any) => {
    handleAnswerChange(e.target.value)
  }

  return (
    <div className={styles.textType}>
      <textarea
        rows={8}
        className={styles.textArea}
        onChange={handleTextChange}
        value={value}
        placeholder="Say something"
      ></textarea>
    </div>
  )
}

export default TextType
