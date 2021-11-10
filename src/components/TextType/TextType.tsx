import * as React from 'react'
import styles from './texttype.module.css'

type Props = {
  value?: string
  handleAddChangeAnswer: (answer: string) => void
}

const TextType = ({ handleAddChangeAnswer, value }: Props) => {
  const handleTextChange = (e: any) => {
    handleAddChangeAnswer(e.target.value)
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
