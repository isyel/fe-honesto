import styles from './question.module.css'
import * as React from 'react'
import { QuestionT } from '../../context/QuestionProvider'
import Button from '../Button'

type Props = {
  question?: QuestionT
  handleGoToNextQuestion: (se: React.SyntheticEvent) => void
  handleGoToPreviousQuestion: (se: React.SyntheticEvent) => void
  saveAnswer: (se: React.SyntheticEvent, answer: number | string) => void
}

const Question = (props: Props) => {
  const {
    question,
    handleGoToNextQuestion,
    handleGoToPreviousQuestion,
    saveAnswer,
  } = props
  const [selectedAnswer, setSelectedAnswer] = React.useState(null)
  return (
    <div className={styles.wrapper}>
      <div className={styles.question}></div>
      <div className={styles.buttons}>
        <Button secondary onClick={handleGoToPreviousQuestion}>
          Previous
        </Button>
        <Button secondary onClick={handleGoToNextQuestion}>
          Skip
        </Button>
        <Button
          secondary={!selectedAnswer}
          onClick={saveAnswer}
          disabled={!selectedAnswer}
        >
          Next
        </Button>
      </div>
      <hr />
      <div className={styles.footer}>
        <div className={styles.questionStatus}>
          <span className={styles.questionCompleted}>QUESTIONS COMPLETED</span>
          <br />
          <span className={styles.questionNumber}>1/10</span>
        </div>
        <div className={styles.rating}></div>
      </div>
    </div>
  )
}

export default Question
