import styles from './question.module.css'
import * as React from 'react'
import { Question2T, QuestionT } from '../../context/QuestionProvider'
import Button from '../Button'
import ScaleType from '../ScaleType'
import TextType from '../TextType'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import FlagIcon from '@mui/icons-material/Flag'

type Props = {
  question?: Question2T | QuestionT
  currentQuestionIndex: number
  questionsLength: number
  handleGoToNextQuestion: (se: React.SyntheticEvent) => void
  handleGoToPreviousQuestion: (se: React.SyntheticEvent) => void
  handleAnswerChange: (se: React.SyntheticEvent) => void
}

const Question = (props: Props) => {
  const {
    question,
    currentQuestionIndex,
    questionsLength,
    handleGoToNextQuestion,
    handleGoToPreviousQuestion,
    handleAnswerChange,
  } = props
  const [selectedAnswer, setSelectedAnswer] = React.useState(null)

  const showOptions = () => {
    switch (question?.type) {
      case 'scale':
        return <ScaleType />
      case 'text':
        return <TextType handleAnswerChange={handleAnswerChange} />

      default:
        return null
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.question}>
        {question?.type === 'scale' || question?.type === 'text' ? (
          showOptions()
        ) : (
          <div>Multichoice</div>
        )}
      </div>
      <div className={styles.buttons}>
        <Button secondary onClick={handleGoToPreviousQuestion}>
          Previous
        </Button>
        <Button secondary onClick={handleGoToNextQuestion}>
          Skip
        </Button>
        <Button
          secondary={!selectedAnswer}
          onClick={handleAnswerChange}
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
          <span className={styles.questionNumber}>
            {currentQuestionIndex + 1}/{questionsLength}
          </span>
        </div>
        <div className={styles.rating}>
          {[...Array(5)].map((e) => (
            <StarBorderIcon />
          ))}
          <FlagIcon />
        </div>
      </div>
    </div>
  )
}

export default Question
