import * as React from 'react'
import { UserContext } from '../../context/UserProvider'
import MainLayout from '../../layouts/MainLayout'
import styles from './questions.module.css'
import { QuestionContext } from '../../context/QuestionProvider'
import Question from '../../components/Question'

const Questions = () => {
  const users = React.useContext(UserContext)
  const questions = React.useContext(QuestionContext)
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    React.useState<number>(0)
  const user = users?.find((user) => user.id === '1')
  const [answers, setAnswers] = React.useState([])

  const handleGoToNextQuestion = () => {
    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex + 1)
  }

  const handleGoToPreviousQuestion = () => {
    setCurrentQuestionIndex((currentQuestionIndex) =>
      currentQuestionIndex > 0
        ? currentQuestionIndex - 1
        : currentQuestionIndex,
    )
  }

  const saveAnswer = (_event: any, answer: string | number) => {}

  console.log(questions)

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        {/* Back button */}
        <h1>Share Feedback</h1>
        <span>Share your feedback with {user?.name || 'No User'}</span>
        {questions && (
          <Question
            question={questions[currentQuestionIndex]}
            saveAnswer={saveAnswer}
            handleGoToNextQuestion={handleGoToNextQuestion}
            handleGoToPreviousQuestion={handleGoToPreviousQuestion}
          />
        )}
      </div>
    </MainLayout>
  )
}

export default Questions
