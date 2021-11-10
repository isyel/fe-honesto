import * as React from 'react'
import styles from './texttype.module.css'

type Props = {
  value?: string
  handleAnswerChange: (se: React.SyntheticEvent) => void
}

const TextType = ({ handleAnswerChange, value }: Props) => {
  const handleTextChange = (e: {
    target: { value: React.SyntheticEvent<Element, Event> }
  }) => {
    handleAnswerChange(e.target.value)
  }

  return (
    <div className={styles.textType}>
      <textarea
        rows={8}
        className={styles.textArea}
        onChange={handleAnswerChange}
        value={value}
        placeholder="Say something"
      ></textarea>
    </div>
  )
}

export default TextType
