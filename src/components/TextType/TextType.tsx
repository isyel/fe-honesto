import * as React from 'react'
import styles from './texttype.module.css'

type Props = {
  field?: string
  handleAnswerChange: (se: React.SyntheticEvent) => void
}

const TextType = ({ handleAnswerChange, field }: Props) => {
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
        value={field}
        placeholder="Say something"
      ></textarea>
    </div>
  )
}

export default TextType
