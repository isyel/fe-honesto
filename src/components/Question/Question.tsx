import styles from './question.module.css'
import * as React from 'react'
import { QuestionT } from '../../context/QuestionProvider'
import Button from '../Button'
import TextType from '../TextType'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import FlagIcon from '@mui/icons-material/Flag'
import MultiChoiceType from '../MultiChoiceType'
import Scale from '../Scale'

type Props = {
  question?: QuestionT
  currentQuestionIndex: number
  questionsLength: number
  handleGoToNextQuestion: (se: React.SyntheticEvent) => void
  handleGoToPreviousQuestion: (se: React.SyntheticEvent) => void
  handleAnswerChange: (se: React.SyntheticEvent | number) => void
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
        return (
          <Scale
            handleAnswerChange={handleAnswerChange}
            scales={10}
            value={0}
          />
        )
      case 'text':
        return <TextType handleAnswerChange={handleAnswerChange} />
      case 'multipleChoice':
        return (
          <MultiChoiceType
            handleAnswerChange={handleAnswerChange}
            options={question.options}
            value={null}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.question}>{showOptions()}</div>
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
            <StarBorderIcon key={e} />
          ))}
          <FlagIcon />
        </div>
      </div>
    </div>
  )
}

export default Question
