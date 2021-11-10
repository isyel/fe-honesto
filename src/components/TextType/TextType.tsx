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
        cols={4}
        className={styles.textArea}
        onChange={handleAnswerChange}
        value={field}
      ></textarea>
    </div>
  )
}

export default TextType
