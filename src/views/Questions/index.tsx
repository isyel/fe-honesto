import * as React from 'react'
import { UserContext } from '../../context/UserProvider'
import MainLayout from '../../layouts/MainLayout'
import styles from './questions.module.css'
import { QuestionContext } from '../../context/QuestionProvider'
import Question from '../../components/Question'
import { FeedbackT } from '../../context/FeedbackProvider'
import { Link, useParams } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import User from '../../components/User'

const Questions = () => {
  const users = React.useContext(UserContext)
  const questions = React.useContext(QuestionContext)
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    React.useState<number>(0)
  const { userId } = useParams<{ userId: string }>()
  const user = users?.find((user) => user.id === userId)
  const [answers, setAnswers] = React.useState([])

  const handleGoToNextQuestion = () => {
    setCurrentQuestionIndex((currentQuestionIndex) =>
      currentQuestionIndex + 1 < questions?.length
        ? currentQuestionIndex + 1
        : currentQuestionIndex,
    )
  }

  const handleGoToPreviousQuestion = () => {
    setCurrentQuestionIndex((currentQuestionIndex) =>
      currentQuestionIndex > 0
        ? currentQuestionIndex - 1
        : currentQuestionIndex,
    )
  }

  const handleAnswerChange = (answer: any) => {}

  const saveAnswer = (answer: FeedbackT) => {}

  const goBack = () => {}

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <Link to="/share-feedback" className={styles.back} onClick={goBack}>
          <ArrowBackIosIcon /> Back
        </Link>
        <section className={styles.textSection}>
          <div>
            {questions && <h2>{questions[currentQuestionIndex].label}</h2>}
            <span>Share your feedback with {user?.name || 'No User'}</span>
          </div>
          <User avatarUrl={user?.avatarUrl} />
        </section>
        {questions && (
          <Question
            question={questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            questionsLength={questions.length}
            handleAnswerChange={handleAnswerChange}
            handleGoToNextQuestion={handleGoToNextQuestion}
            handleGoToPreviousQuestion={handleGoToPreviousQuestion}
          />
        )}
      </div>
    </MainLayout>
  )
}

export default Questions
