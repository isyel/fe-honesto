import styles from './question.module.css'
import * as React from 'react'
import { QuestionT } from '../../context/QuestionProvider'
import Button from '../Button'
import TextType from '../TextType'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import FlagIcon from '@mui/icons-material/Flag'
import MultiChoiceType from '../MultiChoiceType'
import Scale from '../Scale'
import ProgressBar from '../ProgressBar'

type Props = {
  question?: QuestionT
  currentQuestionIndex: number
  questionsLength: number
  saveAnswer: () => void
  handleGoToNextQuestion: (se: React.SyntheticEvent) => void
  handleGoToPreviousQuestion: (se: React.SyntheticEvent) => void
  handleAnswerChange: (
    question: QuestionT | undefined | React.SyntheticEvent,
    answer: any,
  ) => void
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
  const [selectedAnswer, setSelectedAnswer] = React.useState()

  const handleAddChangeAnswer = (answer: any) => {
    setSelectedAnswer(answer)
  }

  const showOptions = () => {
    switch (question?.type) {
      case 'scale':
        return (
          <Scale
            handleAddChangeAnswer={handleAddChangeAnswer}
            scales={10}
            value={selectedAnswer || -1}
          />
        )
      case 'text':
        return (
          <TextType
            handleAddChangeAnswer={handleAddChangeAnswer}
            value={selectedAnswer}
          />
        )
      case 'multipleChoice':
        return (
          <MultiChoiceType
            handleAddChangeAnswer={handleAddChangeAnswer}
            options={question.options}
            value={selectedAnswer || null}
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
          onClick={() => handleAnswerChange(question, selectedAnswer)}
          disabled={!selectedAnswer}
        >
          {currentQuestionIndex + 1 === questionsLength ? 'Submit' : 'Next'}
        </Button>
      </div>
      <ProgressBar scales={questionsLength} value={currentQuestionIndex - 1} />
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
