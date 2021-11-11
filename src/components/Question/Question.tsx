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
import Tooltip from '@mui/material/Tooltip'

type Props = {
  question?: QuestionT
  currentQuestionIndex: number
  questionsLength: number
  answers: { question: QuestionT; feedback: string | number }[]
  saveAnswer: () => void
  handleGoToPreviousQuestion: (se: React.SyntheticEvent) => void
  handleAnswerChange: (
    question: QuestionT | undefined | React.SyntheticEvent,
    skipped: boolean,
    answer: any,
  ) => void
}

const Question = (props: Props) => {
  const {
    question,
    currentQuestionIndex,
    questionsLength,
    handleGoToPreviousQuestion,
    handleAnswerChange,
  } = props
  const answer = props.answers.find(
    (answer) => answer.question.id === question?.id,
  )
  const [selectedAnswer, setSelectedAnswer] = React.useState(answer?.feedback)

  const handleAddChangeAnswer = (answer: any) => {
    setSelectedAnswer(answer)
  }

  const handleSkipQuestion = () => {
    handleAnswerChange(question, true, null)
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
            value={selectedAnswer?.toString() || ''}
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
        {currentQuestionIndex > 0 && (
          <Button secondary onClick={handleGoToPreviousQuestion}>
            Previous
          </Button>
        )}
        <Button secondary onClick={handleSkipQuestion}>
          Skip
        </Button>
        <Button
          secondary={!selectedAnswer}
          onClick={() => handleAnswerChange(question, false, selectedAnswer)}
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
          {[...Array(5)].map((e, index) => (
            <StarBorderIcon key={index} />
          ))}

          <Tooltip
            title="I have feedback about this question please ask me about it"
            arrow
            placement="top"
          >
            <FlagIcon />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default Question
